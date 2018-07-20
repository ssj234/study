package com.shisj.study.spring.four;

import com.shisj.study.spring.one.TestSpring;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.GenericGroovyApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.TestNG;
import org.testng.annotations.Test;

@Test
public class TestBeanFactoryCycle extends TestNG {
    Log log = LogFactory.getLog(TestSpring.class);

    @Test
    public void test(){
        // BeanFactory的生命周期
        DefaultListableBeanFactory beanFactory = new DefaultListableBeanFactory();
        XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(beanFactory);
        reader.loadBeanDefinitions("classpath:/spring-t4.xml");

        beanFactory.addBeanPostProcessor(new MyBeanPostProcess());
        beanFactory.addBeanPostProcessor(new MyInstantiationAwareBeanProcessor());

        Car car1 = (Car) beanFactory.getBean("car");
        System.out.println(car1);
        car1.setColor("红色");

        Car car2 = (Car) beanFactory.getBean("car");
        System.out.println("car1 == car2 :" + (car1 == car2));

        beanFactory.destroySingletons();
    }


    // <!--ApplicationContext添加处理器的方法在xml里面配置即可-->
    @Test
    public  void  test2(){
        ClassPathXmlApplicationContext ctx =new ClassPathXmlApplicationContext("classpath:/spring-t4.xml");
        Car car1 = (Car) ctx.getBean("car");
        System.out.println(car1);
        ctx.destroy();
    }
}
