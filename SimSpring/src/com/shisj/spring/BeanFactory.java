package com.shisj.spring;

import java.io.File;
import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import com.shisj.spring.cglib.BeanEnhancer;

public class BeanFactory {

	Map<String,BeanDefinition> map=new HashMap<String, BeanDefinition>();
	BeanEnhancer enhancer=new BeanEnhancer();
	public BeanFactory(Map<String,BeanDefinition> map){
		this.map = map;
	}
	
	
	public Object getBean(String beanId) throws Exception{
		BeanDefinition definition=map.get(beanId);
		return initialization(definition);
	}
	
	public Object getBean(Class clazz){
		return null;
	}
	
	/**
	 * 返回一个被代理的对象
	 * @param definition
	 * @return
	 * @throws ClassNotFoundException 
	 * @throws NoSuchMethodException 
	 * @throws SecurityException 
	 * @throws InvocationTargetException 
	 * @throws IllegalAccessException 
	 * @throws IllegalArgumentException 
	 */
	private Object initialization(BeanDefinition definition) throws ClassNotFoundException, SecurityException, NoSuchMethodException, IllegalArgumentException, IllegalAccessException, InvocationTargetException{
		if(definition == null)return null;
		Object ret= enhancer.getBean(definition.getClazz());
		Map<String,String> fields=definition.getFields();
		for(String fieldName:fields.keySet()){
			
			Field filed=null;
			try {
				filed = ret.getClass().getSuperclass().getDeclaredField(fieldName);
			} catch (SecurityException e) {
				e.printStackTrace();
			} catch (NoSuchFieldException e) {
				e.printStackTrace();
			}
			if(filed != null){
				Class fieldClass=filed.getType();
				Object valueObj=resolver(fields.get(fieldName),fieldClass);
				String setMethodName=getMethod(fieldName);
				System.out.println(setMethodName);
				Method method=null;
				method=ret.getClass().getSuperclass().getDeclaredMethod(setMethodName, new Class[]{fieldClass});
				method.invoke(ret, new Object[]{valueObj});
			}
		}
		
		return ret;
	}
	
	private Object resolver(String string,Class clazz) {
		if(clazz == String.class){
			return string;
		}
		if(clazz == Integer.class || clazz == int.class) {
			return Integer.valueOf(string);
		}
		if(clazz == Double.class){
			return Double.valueOf(string);
		}
		return null;
	}


	private String getMethod(String field){
		char first=field.charAt(0);
		first=(char) (first-32);
		return "set"+first+field.substring(1);
	}
}
