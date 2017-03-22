package com.alibaba.dubbo.demo.stub;

import com.alibaba.dubbo.demo.DStubService;

public class DStubServiceStub implements DStubService {
	private DStubService dStubService;
	public DStubServiceStub(DStubService dStubService){
		this.dStubService = dStubService;
	}
	@Override
	public String sayHello(String name) {
		System.out.println("before invoke remote sayHello!");
		String ret = dStubService.sayHello(name);
		System.out.println("after invoke remote sayHello!" + ret);
		return ret;
	}
	
	
}
