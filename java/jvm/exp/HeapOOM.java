package com.sim.jvm.exc;

import java.util.ArrayList;
import java.util.List;

public class HeapOOM {

	static class OOMObject{
	}
	
	// -Xms5m -Xmx5m -XX:+HeapDumpOnOutOfMemoryError
	public static void main(String[] args) {
		List<OOMObject> list=new ArrayList<OOMObject>();
		
//		while(true){
//			list.add(new OOMObject());
//		}
		
		
//		String xx=new String("java1");
		
		String str1=new StringBuilder("计算机").append("软件").toString();
		System.out.println(str1.intern()==str1);
		
		String str2=new StringBuilder("ja").append("va1").toString();
		System.out.println(str2.intern()==str2);
		
		System.out.println("java1".intern()==str2);
		
		System.out.println(System.getProperty("java.version"));
	}
}
