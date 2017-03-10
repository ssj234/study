package com.shisj.spring;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.Map;

import javax.xml.parsers.SAXParser;
import javax.xml.parsers.SAXParserFactory;

public class BeanContext {

	private String filePath = null;
	public BeanContext(String filePath){
		this.filePath = filePath;
	}
	
	public BeanFactory start() throws Exception{
		if(filePath == null){
			throw new NullPointerException();
		}
		File  file=new File (filePath);
		if(!file.exists()){
			throw new FileNotFoundException();
		}
		SAXParserFactory factory = SAXParserFactory. newInstance();//sax使用的工厂设计模式，通过SAXParserFactory 获取解析器parser 
		SAXParser saxParser = factory .newSAXParser();//在从解析器中获得解析xml文件的xmlReader 
		BeanDefinitionHandler handle = new BeanDefinitionHandler();
		saxParser.parse(file , handle );//xmlReader 读取流式的xml文件时，需要完成一个Handler的设置，Handler是继承的DefaultHandler
		Map<String,BeanDefinition> definitions=handle.getDefinitions();
		
		BeanFactory factoryRet = new BeanFactory(definitions);
		return factoryRet;
	}
}
