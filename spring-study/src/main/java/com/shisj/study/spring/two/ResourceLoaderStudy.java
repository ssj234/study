package com.shisj.study.spring.two;

import com.shisj.study.spring.StringUtil;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.DefaultResourceLoader;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Repository;

import java.io.IOException;

@Repository
public class ResourceLoaderStudy {


    public int classpathSize(String path) throws IOException {
        int size = 0;
        PathMatchingResourcePatternResolver loader = new PathMatchingResourcePatternResolver();
        Resource rs[] = loader.getResources(path);
        if(rs == null){
            return 0;
        }else{
            for(Resource r : rs){
                if(r.exists()){
                    size++;
                }
            }
//            System.out.print(StringUtil.getString(r[0].getInputStream()));
        }
        return size;
    }
}
