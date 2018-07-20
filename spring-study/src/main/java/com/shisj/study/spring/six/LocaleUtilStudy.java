package com.shisj.study.spring.six;

import java.text.DateFormat;
import java.text.MessageFormat;
import java.text.NumberFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

public class LocaleUtilStudy {

    public static void main(String args[]){

        Locale zh = new Locale("zh","CN");
        Locale en = new Locale("en","US");
        NumberFormat zhFmt = NumberFormat.getCurrencyInstance(zh);
        NumberFormat enFmt = NumberFormat.getCurrencyInstance(en);

        System.out.println(zhFmt.format(122223.433)); // ￥122,223.43
        System.out.println(enFmt.format(122223.433)); // $122,223.43

        DateFormat zhDateFmt = DateFormat.getDateInstance(DateFormat.MEDIUM,zh);
        DateFormat enDateFmt = DateFormat.getDateInstance(DateFormat.MEDIUM,en);
        Date date = Calendar.getInstance().getTime();
        System.out.println(zhDateFmt.format(date)); // 2018-7-20
        System.out.println(enDateFmt.format(date)); // Jul 20, 2018


        String p1 = "{0},你好，你是今天第{1}位客人！";
        String p2 = "Hello,{0},you are the {1}th customer!";
        MessageFormat zhMsgFmt = new MessageFormat(p1,zh);
        MessageFormat enMsgFmt = new MessageFormat(p2,en);

        System.out.println(zhMsgFmt.format(new Object[]{"shi",1})); // shi,你好，你是今天第1位客人！
        System.out.println(enMsgFmt.format(new Object[]{"shi",1})); // Hello,shi,you are the 1th customer!

    }
}
