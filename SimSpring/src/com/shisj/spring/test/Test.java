package com.shisj.spring.test;

import com.shisj.spring.BeanContext;
import com.shisj.spring.BeanFactory;

public class Test {

	public static void main(String[] args) throws Exception {
		BeanContext ctx=new BeanContext("D:\\workspace\\SimSpring\\src\\spring.xml");
		BeanFactory factory=ctx.start();
		HelloBaby baby=(HelloBaby) factory.getBean("helloBaby");
		baby.hello("jason");
	}
}
