package com.shisj.study.spring.five;

import org.springframework.beans.factory.support.MethodReplacer;

import java.lang.reflect.Method;

public class NewBean implements MethodReplacer {
    @Override
    public Object reimplement(Object obj, Method method, Object[] args) throws Throwable {
        String methodName = method.getName();
        if(methodName.equals("sayHello")){
            System.out.println("NewBean.sayHello()");
            return null;
        }else if("getValue".equals(methodName)){
            return "NewBean.getValue()" ;//+ method.invoke(obj,args);
        }else{
            FiveEntity five = new FiveEntity();
            five.setName("five_new");
            return five;
        }
    }
}
