package com.alibaba.dubbo.demo.provider;

import com.alibaba.dubbo.demo.DStubService;

public class DStubServiceImpl implements DStubService {

	@Override
	public String sayHello(String name) {
		return "Hello " + name;
	}

}
