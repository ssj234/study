package com.shisj.spring;

import java.util.HashMap;
import java.util.Map;

public class BeanDefinition {

	private String id;
	private String clazz;
	private Map<String,String> fields=new HashMap<String, String>();
	
	public void addFiled(String key,String value){
		fields.put(key,value);
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public Map<String, String> getFields() {
		return fields;
	}
	public void setFields(Map<String, String> fields) {
		this.fields = fields;
	}
	public String getClazz() {
		return clazz;
	}
	public void setClazz(String clazz) {
		this.clazz = clazz;
	}
	
	
	
	
	
}
