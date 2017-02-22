package com.jvm.arg;

/**
 * 不加参数运行结果：
 * 最大内存：247M
 * 总内存：15M
 * @author shisj
 *
 */

public class Test02 {

	
	public static void main(String[] args) {
		
		//1-
		//-Xms20m -Xmx20m -Xmn1m -XX:SurvivorRatio=2 -XX:+PrintGCDetails -XX:+UseSerialGC
		
		//2- SurvivorRatio=eden/from
		//-Xms20m -Xmx20m -Xmn7m -XX:SurvivorRatio=2 -XX:+PrintGCDetails -XX:+UseSerialGC
		
		//3-  NewRatio=新生代/老年代
		//-Xms20m -Xmx20m -XX:NewRatio=2 -XX:+PrintGCDetails -XX:+UseSerialGC
		
		byte[] b=null;
		
		for(int i=0;i<10;i++){
			b=new byte[1024*1024];
		}
		
	}
}
