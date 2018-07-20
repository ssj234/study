package com.shisj.study.spring.two;

import com.shisj.study.spring.StringUtil;
import org.springframework.core.io.PathResource;
import org.springframework.stereotype.Repository;

import java.io.IOException;

@Repository
public class FileResourceStudy {

    /**
     * 这里的path是文件的路径
     * @param path
     * @return
     * @throws IOException
     */
    public  String fileRead(String path) throws IOException {
        PathResource res = new PathResource(path);
        return StringUtil.getString(res.getInputStream());
    }
}
