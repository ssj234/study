package com.shisj.study.spring.five;


import org.springframework.stereotype.Component;
import org.springframework.stereotype.Controller;

@Controller("controller")
public class TUserController {

    public String getName(){
        return "TUserController";
    }
}
