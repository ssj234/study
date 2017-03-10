package com.shisj.spring.cglib;

import java.lang.reflect.Method;
import java.lang.reflect.Modifier;

import net.sf.cglib.proxy.Enhancer;
import net.sf.cglib.proxy.InvocationHandler;
import net.sf.cglib.proxy.MethodInterceptor;
import net.sf.cglib.proxy.MethodProxy;

public class BeanEnhancer implements MethodInterceptor {

	public Object getBean(String clazzName) throws ClassNotFoundException{
		Class clazz=Class.forName(clazzName);
		Enhancer enhancer=new Enhancer();
		enhancer.setSuperclass(clazz);
		enhancer.setCallback(this);
		return enhancer.create();
	}

	@Override
	public Object intercept(Object object, Method method, Object[] args,
			MethodProxy proxy) throws Throwable {
		Object ret=null;
		System.out.println("before invoke");//调用之前
		if (!Modifier.isAbstract(method.getModifiers())) {
			ret=proxy.invokeSuper(object, args);
		}
		System.out.println("after invoke");//调用之后
		return ret;
	}

	
	
}
