package com.shisj.study.spring.one;

import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public class UUIDFactory implements IDFactory {
    @Override
    public String generateId() {
        return UUID.randomUUID().toString();
    }
}
