package com.shisj.study.spring.five;

import com.shisj.study.spring.one.TestSpring;
import com.shisj.study.spring.three.Car;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.PropertyValue;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.context.support.GenericGroovyApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.Assert;
import org.testng.annotations.Test;

@Test
@ContextConfiguration("classpath:spring-t5.xml")
public class TestBeanInstance extends AbstractTestNGSpringContextTests {
    Log log = LogFactory.getLog(TestSpring.class);

    @Test
    public void testClasspath(){
        DefaultListableBeanFactory factory = new DefaultListableBeanFactory();
        XmlBeanDefinitionReader reader = new XmlBeanDefinitionReader(factory);
        reader.loadBeanDefinitions("classpath:spring-t5.xml");

        OldBean oldBean = factory.getBean("oldBean",OldBean.class);
        log.debug(oldBean.getEntity().getName());
        oldBean.sayHello();
        Assert.assertEquals("five_new",oldBean.getEntity().getName());


        PropertyValue pv = factory.getBean("propertyValue",PropertyValue.class);
        log.debug("pv.getValue() is " + pv.getValue());
        Assert.assertEquals("NewBean.getValue()",pv.getValue());

    }


    @Test
    public void testAnonation(){
        TUserComponent tc = this.applicationContext.getBean("TUserComponent",TUserComponent.class);
        Assert.assertEquals(tc.getName(),"TUserComponent");

        TUserDao dao = this.applicationContext.getBean("TUserDao",TUserDao.class);
        Assert.assertEquals(dao.getName(),"TUserDao");

        TUserService service = this.applicationContext.getBean("TUserService",TUserService.class);
        Assert.assertEquals(service.getName(),"TUserService");

        //  @Controller("controller")
        TUserController controller1 = this.applicationContext.getBean("controller",TUserController.class);
        Assert.assertEquals(controller1.getName(),"TUserController");

    }


}
