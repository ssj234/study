package com.shisj.study.spring.two;

import com.shisj.study.spring.StringUtil;
import org.springframework.core.io.*;
import org.springframework.stereotype.Repository;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

/**
 * DefaultResourceLoader默认逻辑
 * 1. 从添加的ProtocolResolver中获取资源，如果有则返回
 * 2.若以/开头，则使用ClassPathContextResource
 * 3.若以'classpath:'开头，则使用ClassPathContextResource，路径参数删除'classpath:'
 */
@Repository
public class DefaultResourceLoaderStudy {


    /**
     * 创建了一个ProtocolResolver
     * @return
     * @throws IOException
     */
    public String testNO1(String path) throws IOException {

        ResourceLoader loader = new DefaultResourceLoader();
        ((DefaultResourceLoader) loader).addProtocolResolver(new ProtocolResolver() {
            @Override
            public Resource resolve(String location, ResourceLoader resourceLoader) {
                // 去掉PR后的资源
                if(location.startsWith("PR")){
                    return  resourceLoader.getResource(location.substring(2));
                }
                return null;
            }
        });

        InputStream is = loader.getResource(path).getInputStream();
        return StringUtil.getString(is);
    }


}
