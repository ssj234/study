package com.alibaba.dubbo.demo.provider;

import java.util.concurrent.atomic.AtomicInteger;

import com.alibaba.dubbo.demo.CacheService;

public class CacheServiceImpl implements CacheService {
    
    private final AtomicInteger i = new AtomicInteger();

    public String findCache(String id) {
        return "request: " + id + ", response: " + i.getAndIncrement();
    }

}