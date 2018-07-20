package com.shisj.study.spring.five;

import com.shisj.study.spring.one.TestSpring;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.PropertyValue;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.beans.factory.xml.XmlBeanDefinitionReader;
import org.springframework.stereotype.Controller;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.Assert;
import org.testng.annotations.Test;

@Test
@ContextConfiguration("classpath:spring-t5-1.xml")
public class TestBeanInstance1 extends AbstractTestNGSpringContextTests {
    Log log = LogFactory.getLog(TestSpring.class);

    @Test
    public void testAnonation(){
        TUserComponent tc = null;
        TUserDao dao = null;
        TUserService service = null;
        TUserController controller = null;

        // 排除了Repository 包含其他的
        try{
            dao = this.applicationContext.getBean("TUserDao",TUserDao.class);
            Assert.assertEquals(1,0);
        }catch (Exception e){
            Assert.assertEquals(dao,null);
        }

        service = this.applicationContext.getBean("TUserService",TUserService.class);
        Assert.assertEquals(service.getName(),"TUserService");

        //@Controller("controller")
        controller = this.applicationContext.getBean("controller",TUserController.class);
        Assert.assertEquals(controller.getName(),"TUserController");

    }


}
