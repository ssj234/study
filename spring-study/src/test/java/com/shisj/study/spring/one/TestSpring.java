package com.shisj.study.spring.one;

import com.shisj.study.spring.one.IDFactory;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.Assert;
import org.testng.annotations.Test;

@Test
@ContextConfiguration("classpath:spring-t0.xml")
public class TestSpring extends AbstractTestNGSpringContextTests {

    @Autowired
    IDFactory idFactory;


    @Autowired
    @Qualifier("UUIDFactory")
    IDFactory idFactory2;

    @Test
    void testIDGenerator(){
        String id = idFactory.generateId();
        Assert.assertEquals(36,id.length());
    }

    @Test
    void testID2Generator(){
        String id = idFactory2.generateId();
        Assert.assertEquals(36,id.length());
    }

}
