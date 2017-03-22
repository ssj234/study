import java.util.Map;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.alibaba.dubbo.demo.DemoService;
import com.alibaba.dubbo.rpc.RpcContext;
import com.alibaba.dubbo.rpc.service.GenericService;
 
public class GenericConsumer {
 
    public static void main(String[] args) throws Exception {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"consumer.xml"});
        context.start();
        
        GenericService genericService = (GenericService)context.getBean("genericService"); 
        String hello = (String) genericService.$invoke("world....",null,null); 
        System.out.println( hello );
        
        String serverIP = RpcContext.getContext().getRemoteHost(); // 获取最后一次调用的提供方IP地址
        String application = RpcContext.getContext().getUrl().getParameter("application"); // 获取当前服务配置信息，所有配置信息都将转换为URL的参数
        System.out.println(serverIP + " " + application);
    }
    
}