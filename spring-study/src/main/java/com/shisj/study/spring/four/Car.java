package com.shisj.study.spring.four;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.*;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class Car implements BeanFactoryAware,BeanNameAware,InitializingBean,DisposableBean,ApplicationContextAware {

    private String brand;
    private String color;
    private int maxSpeed;

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public int getMaxSpeed() {
        return maxSpeed;
    }

    public void setMaxSpeed(int maxSpeed) {
        this.maxSpeed = maxSpeed;
    }

    @Override
    public String toString() {
        return "brand is " + this.brand +" color is " + this.color +" maxSpeed is" + this.maxSpeed;
    }


    @Override
    public void setBeanFactory(BeanFactory beanFactory) throws BeansException {
        System.out.println("[invoke] BeanFactoryAware setBeanFactory()");
    }

    @Override
    public void setBeanName(String name) {
        System.out.println("[invoke] BeanNameAware setBeanName()");
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("[invoke] DisposableBean destroy()");
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("[invoke] InitializingBean afterPropertiesSet()");
    }

    public void myInit(){
        System.out.println("[invoke] init-method myInit()");
    }

    public void myDestroy(){
        System.out.println("[invoke] destory-method myDistory()");
    }

    @Override
    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        System.out.println("[invoke] setApplicationContext()");
    }
}
