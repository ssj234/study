package com.shisj.spring.test;

public class HelloBaby {

	private int age;
	private String name;
	
	
	
	public void hello(String yourname){
		System.out.println("My name is" + name+" , age is "+age+" hello "+yourname);
	}



	public int getAge() {
		return age;
	}



	public void setAge(int age) {
		this.age = age;
	}



	public String getName() {
		return name;
	}



	public void setName(String name) {
		this.name = name;
	}
	
	
	
}
