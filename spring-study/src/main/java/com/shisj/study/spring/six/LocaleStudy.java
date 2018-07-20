package com.shisj.study.spring.six;

import java.util.Locale;

public class LocaleStudy {

    public static  void test(){
        Locale locale = new Locale("zh");

        // zh_CN
        locale = new Locale("zh","CN");

        // zh_CN
        locale = Locale.CHINESE;

        // 获取系统默认的，可以通过 -Duser.language=en -Duser.region=US修改默认设置
        locale = Locale.getDefault();
        System.out.println(locale.getDisplayName());
    }

    public static void main(String args[]){
        LocaleStudy.test();
    }
}
