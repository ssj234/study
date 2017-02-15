package com.lang.test;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;

public class MyClassLoader extends ClassLoader {

	private String name;//类加载器的名字
	private String path="d:\\";//
	private final String fileType=".class";
	public MyClassLoader(String name){
		//让系统类-应用加载器成为该类加载器的父加载器
		super();
		this.name=name;
	}
	
	public MyClassLoader(ClassLoader parent,String name){
		//指定该类加载器的父类加载器,如parent为null，则表示其父加载器为根加载器，详见
		//loadClass()中c = findBootstrapClassOrNull(name);
		super(parent);
		this.name=name;
	}
	
	@Override
	protected Class<?> findClass(String name) throws ClassNotFoundException {
		byte[] buf = null;
		try {
			buf = loadClassData(name);
		} catch (IOException e) {
			e.printStackTrace();
		}
		if(buf==null)return null;
		return defineClass(buf, 0, buf.length);
	}
	
	
	private byte[] loadClassData(String name) throws IOException {
		InputStream is=null;
		byte[] data=null;
		ByteArrayOutputStream baos=null;
		
		try{
			name=name.replace(".", "\\");
			is=new FileInputStream(new File(path+name+fileType));
			baos=new ByteArrayOutputStream();
			int ch=0;
			while(-1!=(ch=is.read())){
				baos.write(ch);
			}
			data=baos.toByteArray();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			is.close();
			baos.close();
		}
		return data;
	}

	@Override
	public String toString() {
		// TODO Auto-generated method stub
		return this.name;
	}

	/**
	 * @return the path
	 */
	public String getPath() {
		return path;
	}

	/**
	 * @param path the path to set
	 */
	public void setPath(String path) {
		this.path = path;
	}
	
	
	public static void main(String[] args) throws Exception {
		MyClassLoader loader1=new MyClassLoader("loader1");
		loader1.setPath("d:\\dubbo\\serverlib\\");
		
		MyClassLoader loader2=new MyClassLoader(loader1,"loader2");
		loader2.setPath("d:\\dubbo\\clientlib\\");
		
		MyClassLoader loader3=new MyClassLoader(null,"loader3");
		loader3.setPath("d:\\dubbo\\otherlib\\");
		
		test(loader1);
		test(loader2);
		test(loader3);
	}
	
	public static void test(MyClassLoader loader) throws Exception{
		Class clazz=loader.loadClass("Sample");
		clazz.newInstance();
	}
	
}
