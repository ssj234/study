package com.sim.jvm.exc;

import java.util.ArrayList;
import java.util.List;

/**
 * -XX:PermSize=10M -XX:MaxPerSize=10M
 * @author shishengjie
 *
 */
public class PermOOM {

	
	public static void main(String[] args) {
		List<String> list=new ArrayList<String>();
		int i=0;
		
		while(true){
			String a=String.valueOf(i++)+"232323232323232323232323ewewewewewewew32323232323232";
			list.add(a.intern());
		}
	}
}
