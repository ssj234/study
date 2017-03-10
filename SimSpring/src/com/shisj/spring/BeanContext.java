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
		SAXParserFactory factory = SAXParserFactory. newInstance();//saxʹ�õĹ������ģʽ��ͨ��SAXParserFactory ��ȡ������parser 
		SAXParser saxParser = factory .newSAXParser();//�ڴӽ������л�ý���xml�ļ���xmlReader 
		BeanDefinitionHandler handle = new BeanDefinitionHandler();
		saxParser.parse(file , handle );//xmlReader ��ȡ��ʽ��xml�ļ�ʱ����Ҫ���һ��Handler�����ã�Handler�Ǽ̳е�DefaultHandler
		Map<String,BeanDefinition> definitions=handle.getDefinitions();
		
		BeanFactory factoryRet = new BeanFactory(definitions);
		return factoryRet;
	}
}
