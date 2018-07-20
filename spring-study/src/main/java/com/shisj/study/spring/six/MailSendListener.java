package com.shisj.study.spring.six;

import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ApplicationContextEvent;
import org.springframework.stereotype.Component;

@Component
public class MailSendListener implements ApplicationListener<MailSendEvent> {

    @Override
    public void onApplicationEvent(MailSendEvent event) {
        MailSendEvent mse = event;
        System.out.println("MailSendListener to " + event.getTo());
    }
}
