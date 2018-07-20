package com.shisj.study.spring.two;

import com.shisj.study.spring.StringUtil;
import com.shisj.study.spring.one.IDFactory;
import com.shisj.study.spring.one.TestSpring;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.testng.AbstractTestNGSpringContextTests;
import org.testng.Assert;
import org.testng.annotations.Test;

import java.io.IOException;
import java.io.InputStream;

@Test
@ContextConfiguration("classpath:spring-t2.xml")
public class TestResourceLoader extends AbstractTestNGSpringContextTests {
    Log log = LogFactory.getLog(TestSpring.class);
    @Autowired
    DefaultResourceLoaderStudy defaultResourceLoaderStudy;

    @Autowired
    FileResourceStudy fileResourceStudy;

    @Autowired
    UrlResourceStudy urlResourceStudy;

    @Autowired
    ResourceLoaderStudy resourceLoaderStudy;
    @Test
    void testNO1() throws IOException {
        // 读取Resource1.txt的内容
        String ret = defaultResourceLoaderStudy.testNO1("PRResource1.txt");
        log.debug("testNO1 is:" + ret);
        Assert.assertEquals(ret,"PRResource1");
    }

    @Test
    void testNO2() throws IOException {
        // 读取Resource1.txt的内容
        DefaultResourceLoader loader = new DefaultResourceLoader();
        InputStream is = loader.getResource("/Resource1.txt").getInputStream();
        String ret = StringUtil.getString(is);
        log.debug("testNO2 is:" + ret);
        Assert.assertEquals(ret,"PRResource1");
    }

    @Test
    void testNO3() throws IOException {
        // 读取Resource1.txt的内容
        DefaultResourceLoader loader = new DefaultResourceLoader();
        InputStream is = loader.getResource("classpath:/Resource1.txt").getInputStream();
        String ret = StringUtil.getString(is);
        log.debug("testNO3 is:" + ret);
        Assert.assertEquals(ret,"PRResource1");
    }

    @Test
    void testNO4() throws IOException {
        // 读取Resource1.txt的内容
        DefaultResourceLoader loader = new DefaultResourceLoader();
        InputStream is = loader.getResource("classpath:Resource1.txt").getInputStream();
        String ret = StringUtil.getString(is);
        log.debug("testNO4 is:" + ret);
        Assert.assertEquals(ret,"PRResource1");
    }


    @Test
    void ftestNO1() throws IOException {
        // 读取Resource1.txt的内容
        FileResourceStudy fileResourceStudy = new FileResourceStudy();
        String ret = fileResourceStudy.fileRead("/home/shisj/zgc/spring-study/src/test/resources/Resource1.txt");
        log.debug("ftestNO1 is:" + ret);
        Assert.assertEquals(ret,"PRResource1");
    }

    @Test
    void ctestNO1() throws IOException {
        // 读取Resource1.txt的内容
        ClasspathResourceStudy fileResourceStudy = new ClasspathResourceStudy();
        String ret = fileResourceStudy.classpathRead("/Resource1.txt");
        log.debug("ctestNO1-1 is:" + ret);
        Assert.assertEquals(ret,"PRResource1");

        ret = fileResourceStudy.classpathRead("Resource1.txt");
        log.debug("ctestNO1-2 is:" + ret);
        Assert.assertEquals(ret,"PRResource1");
    }


    @Test
    void ftp() throws IOException {
        String ret = urlResourceStudy.ftp();
        log.debug("ftp is " + ret);
    }

    @Test
    void http() throws IOException {
        String ret = urlResourceStudy.http();
        log.debug("http is " + ret);
    }

    @Test
    void classpathTest01() throws IOException {
        int size = resourceLoaderStudy.classpathSize("classpath:/pom.xml");
        log.debug("[classpath:/pom.xml]size is " + size);
        Assert.assertEquals(size,1);

        size = resourceLoaderStudy.classpathSize("classpath*:/pom.xml");
        log.debug("[classpath*:/pom.xml]size is " + size);
        Assert.assertEquals(size,1);

        // 查找所有jar中 所有的pom.xml文件
        size = resourceLoaderStudy.classpathSize("classpath*:/**/pom.xml");
        log.debug("[classpath*:/**/pom.xml]size is " + size);
        Assert.assertEquals(size,7);

        // 查找所有jar中 最后一个文件夹是logback开头的pom.xml
        size = resourceLoaderStudy.classpathSize("classpath*:/**/logback*/pom.xml");
        log.debug("[classpath*:/**/logback*/pom.xml]size is " + size);
        Assert.assertEquals(size,2);
    }

    @Test
    public void testClasspath(){
        String rets[] =this.applicationContext.getBeanDefinitionNames();
        for(String ret : rets){
            log.debug("getBeanDefinitionNames is " + ret);
        }
    }
}
