package com.shisj.study.spring.two;

import com.shisj.study.spring.StringUtil;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;

@Repository
public class UrlResourceStudy {

    public String ftp() throws IOException {
        // String protocol, String host, int port, String file
        URL url = new URL("ftp","web.uxiaowo.com",21,"/htdocs/sirivis/installh3");
//        url.set();
        UrlResource resource = new UrlResource(url);
        return StringUtil.getString(resource.getInputStream());
    }

    public String http() throws IOException {
        // String protocol, String host, int port, String file
        URL url = new URL("https","www.baidu.com",21,"index.html");
//        url.set();
        UrlResource resource = new UrlResource(url);
        return StringUtil.getString(resource.getInputStream());
    }
}
