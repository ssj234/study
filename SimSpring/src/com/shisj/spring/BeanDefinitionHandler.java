package com.shisj.spring;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.xml.sax.Attributes;
import org.xml.sax.helpers.DefaultHandler;

public class BeanDefinitionHandler extends DefaultHandler {
	private final static String BEAN = "bean";
	private final static String PARAM = "param";
	private final static String CLASS = "class";
	private final static String NAME = "name";
	private final static String ID = "id";
	private Map<String,BeanDefinition> definitions=new HashMap<String,BeanDefinition>();
	private BeanDefinition definition=null;
	private String name=null,qName=null;
	public void startElement (String uri, String localName, String qName, Attributes attributes) { 
        //开始解析节点 
//		System.out.println("-====" + qName);
		this.qName=qName;
		if(BEAN.equals(qName)){
			definition=new BeanDefinition();
			String id=attributes.getValue(ID);
			String clazz=attributes.getValue(CLASS);
			definition.setId(id);
			definition.setClazz(clazz);
		}else if(PARAM.equals(qName)){
			name=attributes.getValue(NAME);
		}
    } 
    //接收element内部的数据  
    public void characters (char[] ch, int start, int length) { 
        //保存节点内容 
//    	System.out.println(this.qName+">>" +new String(ch,start,length));
    	if(PARAM.equals(this.qName)){
    		if(this.name != null){
	    		String value = new String(ch,start,length);
	    		definition.addFiled(name, value);
    		}
    	}
    	
    } 
     
    public void endElement (String uri, String localName, String qName) { 
        //结束解析节点 
//    	System.out.println("end>>>"+qName);
    	if(BEAN.equals(qName)){
    		definitions.put(definition.getId(), definition);
		}else if(PARAM.equals(qName)){
    		this.name=null;
		}
    }
    

    public Map<String,BeanDefinition> getDefinitions(){
    	return definitions;
    }
	
}
