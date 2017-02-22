package com.jvm.arg;

/**
 * 不加参数运行结果：
 * 最大内存：247M
 * 总内存：15M
 * @author shisj
 *
 */

public class Test01 {

	
	public static void main(String[] args) {
		
		//-XX:+UseCompressedOops  -XX:-UseLargePagesIndividualAllocation
		
		//-Xms5m -Xmx20m  -XX:+PrintGCDetails -XX:+UseSerialGC -XX:+PrintCommandLineFlags
		
		//1:
		//-XX:+PrintGC -Xms5m -Xmx20m -XX:+UseSerialGC -XX:+PrintGCDetails
		
		//查看GC信息，Output:247M 14M/15M  [-Xms5m -Xmx20m] 19M/4M/4M
		System.out.println("max memory:"+Runtime.getRuntime().maxMemory()/1024/1024);
		System.out.println("free memory:"+Runtime.getRuntime().freeMemory()/1024/1024);
		System.out.println("total memory:"+Runtime.getRuntime().totalMemory()/1024/1024);
		
		byte[] b1=new byte[1024*1024];
		
		System.out.println("分配了1M");//Output:247M 13M/15M  [-Xms5m -Xmx20m] 19M/3M/4M
		System.out.println("max memory:"+Runtime.getRuntime().maxMemory()/1024/1024);
		System.out.println("free memory:"+Runtime.getRuntime().freeMemory()/1024/1024);
		System.out.println("total memory:"+Runtime.getRuntime().totalMemory()/1024/1024);
		
		byte[] b2=new byte[4*1024*1024];
		
		System.out.println("分配了4M");//Output:247M 9M/15M  [-Xms5m -Xmx20m] 19M/3M/9M
		System.out.println("max memory:"+Runtime.getRuntime().maxMemory()/1024/1024);
		System.out.println("free memory:"+Runtime.getRuntime().freeMemory()/1024/1024);
		System.out.println("total memory:"+Runtime.getRuntime().totalMemory()/1024/1024);
		
	}
}
