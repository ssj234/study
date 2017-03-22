package com.alibaba.dubbo.demo;

import com.alibaba.dubbo.rpc.service.GenericService;

 
public interface DemoService extends GenericService{
 
    String sayHello(String name);
    
}