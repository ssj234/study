package com.shisj.study.spring;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class StringUtil {
    public static String getString(InputStream is) throws IOException {
        int i = -1;
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        while( (i = is.read()) != -1){
            baos.write(i);
        }
        return baos.toString();
    }
}
