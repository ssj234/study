package com.jvm.arg;


public class Test03 {

	
	public static void main(String[] args) {
		
		//1-
		//-Xms2m -Xmx2m -XX:+HeapDumpOnOutOfMemoryError -XX:HeapDumpPath=d:/test03.dump
		
		byte[] b=null;
		
		for(int i=0;i<10;i++){
			b=new byte[2*1024*1024];
		}
		
	}
}
