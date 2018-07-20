package com.shisj.study.spring.four;

import org.springframework.beans.BeansException;
import org.springframework.beans.PropertyValue;
import org.springframework.beans.PropertyValues;
import org.springframework.beans.factory.config.InstantiationAwareBeanPostProcessor;
import org.springframework.beans.factory.config.InstantiationAwareBeanPostProcessorAdapter;

import java.beans.PropertyDescriptor;

public class MyInstantiationAwareBeanProcessor extends InstantiationAwareBeanPostProcessorAdapter {


    // 在实例化Bean前调用
    @Override
    public Object postProcessBeforeInstantiation(Class<?> beanClass, String beanName) throws BeansException {
        if("car".equals(beanName)){
            System.out.println("[invoke] MyInstantiationAwareBeanProcessor postProcessBeforeInstantiation()");
        }
        return null;
    }

    // 在实例化bean后调用
    @Override
    public boolean postProcessAfterInstantiation(Object bean, String beanName) throws BeansException {
        if("car".equals(beanName)){
            Car car = (Car) bean;
            System.out.println(car.toString());
            System.out.println("[invoke] MyInstantiationAwareBeanProcessor postProcessAfterInstantiation()");
        }
        return true;
    }

    // 在设置某个属性时调用
    @Override
    public PropertyValues postProcessPropertyValues(PropertyValues pvs, PropertyDescriptor[] pds, Object bean, String beanName) throws BeansException {
        if("car".equals(beanName)){
            System.out.println("[invoke-begin] MyInstantiationAwareBeanProcessor postProcessPropertyValues()");
            PropertyValue rets [] = pvs.getPropertyValues();
            for(PropertyValue v : rets){
                System.out.println(v.getName() +"  " + v.getValue());
            }

            System.out.println("[invoke-end] MyInstantiationAwareBeanProcessor postProcessPropertyValues()");
        }

        return  pvs;
    }
}
