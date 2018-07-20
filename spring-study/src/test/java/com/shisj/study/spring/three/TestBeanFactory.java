package com.shisj.study.spring.three;

import com.shisj.study.spring.StringUtil;
import com.shisj.study.spring.one.TestSpring;
import com.shisj.study.spring.two.*;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.springframework.context.support.GenericGroovyApplicationContext;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.IOException;
import java.io.InputStream;

@Test
@ContextConfiguration("classpath:spring-t3.xml")
public class TestBeanFactory extends AbstractTestNGSpringContextTests {
    Log log = LogFactory.getLog(TestSpring.class);

    @Test
    public void testClasspath(){
        DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
        XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(factory);
        reader.loadBeanDefinitions("classpath:spring-t3.xml");

        Car car = factory.getBean("car",Car.class);
        log.debug(car.toString());
    }


    @Test
    public void testGrovvy(){
        String path = "classpath:groovy-beans.groovy";
        GenericGroovyApplicationContext ctx= new GenericGroovyApplicationContext(path);
        Car car = (Car) ctx.getBean("car");
        log.debug(car.toString());
    }
}
