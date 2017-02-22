package com.sim.jvm.exc;

/**
 * -Xss2M
 * @author shishengjie
 *
 */
public class StackOOM {

	private static int stackLength=1;
	
	public void stackLeak(){
		stackLength++;
		stackLeak();
	}
	
	public static void main(String[] args) {
		StackOOM oom=new StackOOM();
		try{
			oom.stackLeak();
		}catch(Throwable t){
			System.out.println("Stack length:"+stackLength);
			t.printStackTrace();
		}
	}
}
