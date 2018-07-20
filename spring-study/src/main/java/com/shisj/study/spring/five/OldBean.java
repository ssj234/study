package com.shisj.study.spring.five;

public class OldBean {

    public FiveEntity getEntity(){
        FiveEntity five = new FiveEntity();
        five.setName("five_old");
        return five;
    }

    public void sayHello(){
        System.out.println("OldBean.sayHello()");
    }
}
