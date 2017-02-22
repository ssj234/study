package com.jvm.arg;


public class Test04 {

	static int count=0;
	//-Xss1m	58486
	//-Xss5m	319788
	static void fun(){
		count++;
		fun();
	}
	
	public static void main(String[] args) {
		try{
			fun();
		}catch(StackOverflowError e){
			System.out.println("最大深度:"+count);
		}
	}
}
