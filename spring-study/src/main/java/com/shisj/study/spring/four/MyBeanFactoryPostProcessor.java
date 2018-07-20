package com.shisj.study.spring.four;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;

/**
 * 工厂后处理器
 * 启动容器后就会调用，之后的流程是BeanFactory的流程
 */
public class MyBeanFactoryPostProcessor implements BeanFactoryPostProcessor {
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        BeanDefinition bd = beanFactory.getBeanDefinition("car");

        bd.getPropertyValues().addPropertyValue("brand","奇瑞QQ");
        System.out.println("[invoke] MyBeanFactoryPostProcessor postProcessBeanFactory() ");
    }
}
