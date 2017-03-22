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
        
        String serverIP = RpcContext.getContext().getRemoteHost(); // ��ȡ���һ�ε��õ��ṩ��IP��ַ
        String application = RpcContext.getContext().getUrl().getParameter("application"); // ��ȡ��ǰ����������Ϣ������������Ϣ����ת��ΪURL�Ĳ���
        System.out.println(serverIP + " " + application);
    }
    
}