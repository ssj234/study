package com.shisj.study.spring.six;

import com.shisj.study.spring.five.*;
import com.shisj.study.spring.one.TestSpring;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.PropertyValue;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.util.Locale;

@Test
@ContextConfiguration("classpath:spring-t6.xml")
public class TestProperty extends AbstractTestNGSpringContextTests {
    Log log = LogFactory.getLog(TestSpring.class);



    @Test
    public void testAnonationPlacehoder(){
        // driverClassName: mysql1 url: jdbc:mysql://localhost:3306/mydb1 username:root1 password:root1
        MyDataSource tc = this.applicationContext.getBean("myDataSource",MyDataSource.class);
        log.debug(tc.toString());
    }


    @Test
    public void testMessageSource(){
        // driverClassName: mysql1 url: jdbc:mysql://localhost:3306/mydb1 username:root1 password:root1
        Locale zh = new Locale("zh","CN");
        Locale en = new Locale("en","US");
        String zhAccount = this.applicationContext.getMessage("account",null,zh);
        String enAccount = this.applicationContext.getMessage("account",null,en);
        log.debug(zhAccount);
        log.debug(enAccount);
    }


    @Test
    public void testEvent(){
        MailSender sender = this.applicationContext.getBean("mailSender",MailSender.class);
        sender.sendMail("shi");
    }

}
