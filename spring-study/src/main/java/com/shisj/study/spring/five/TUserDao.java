package com.shisj.study.spring.five;


import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
public class TUserDao {
    public String getName(){
        return "TUserDao";
    }
}
