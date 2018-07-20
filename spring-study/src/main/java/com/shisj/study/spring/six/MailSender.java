package com.shisj.study.spring.six;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Service;

/**
 * 容器启动后会设置ctx，发送邮件时调用sendMail，会发送事件
 */

@Service
public class MailSender implements ApplicationContextAware {
    ApplicationContext ctx;
    @Override
    public void setApplicationContext(ApplicationContext ctx) throws BeansException {
        this.ctx = ctx;
    }

    public void sendMail(String to){
        this.ctx.publishEvent(new MailSendEvent(this.ctx,to));
    }
}
