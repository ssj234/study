package com.shisj.study.spring.two;

import com.shisj.study.spring.StringUtil;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.PathResource;
import org.springframework.stereotype.Repository;

import java.io.IOException;

@Repository
public class ClasspathResourceStudy {

    /**
     * 这里的path是基于classpath的
     * classpath:和clasapath:/ 是一样的
     * @param path
     * @return
     * @throws IOException
     */
    public  String classpathRead(String path) throws IOException {
        ClassPathResource res = new ClassPathResource(path);
        return StringUtil.getString(res.getInputStream());
    }
}
