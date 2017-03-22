import java.util.Map;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.alibaba.dubbo.config.ReferenceConfig;
import com.alibaba.dubbo.demo.DStubService;
import com.alibaba.dubbo.demo.DemoService;
import com.alibaba.dubbo.rpc.service.GenericService;
 
public class DStubConsumer {
 
    public static void main(String[] args) throws Exception {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"consumer.xml"});
        context.start();
        
        DStubService dStubService = (DStubService)context.getBean("dStubService"); 
        String hello = dStubService.sayHello("world...."); 
        System.out.println( hello );
        
    }
    
 
}