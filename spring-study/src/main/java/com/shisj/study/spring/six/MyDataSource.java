package com.shisj.study.spring.six;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class MyDataSource {

    @Value("${driverClassName}")
    private String driverClassName;


    @Value("${url}")
    private String url;

    @Value("${username}")
    private String username;

    @Value("${password}")
    private String password;

    @Override
    public String toString() {
        return "driverClassName: " + driverClassName +" url: " + url +" username:" + username +" password:" + password;
    }
}
