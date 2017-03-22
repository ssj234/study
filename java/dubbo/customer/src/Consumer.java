import java.util.Map;

import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.alibaba.dubbo.config.ReferenceConfig;
import com.alibaba.dubbo.demo.DemoService;
import com.alibaba.dubbo.rpc.service.GenericService;
 
public class Consumer {
 
    public static void main(String[] args) throws Exception {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"consumer.xml"});
        context.start();
        
        DemoService demoService = (DemoService)context.getBean("demoService"); 
        String hello = demoService.sayHello("world...."); 
        System.out.println( hello );
        
//        GenericService ser= new Consumer().getService(context,"HouseLoanCalcInit");
//        System.out.println("ser"+ser);
//        System.out.println( ser.$invoke("execute",null,null));
    }
    
    public GenericService getService(ClassPathXmlApplicationContext ctx,String service) throws Exception {
		Map<String, ReferenceConfig> rcs = (Map<String, ReferenceConfig>) ctx.getBeansOfType(ReferenceConfig.class);
		GenericService gs=null;
		System.out.println("333333333"+rcs.size());
		for(ReferenceConfig rc : rcs.values()) {
			
			if(rc.isGeneric()) {
				
				if(rc.getId().equals(service)){
					System.out.println("44444444444"+rcs.size()+rc.getId()+" "+service);
					gs=(GenericService)rc.get();
					System.out.println("55555555555"+rcs.size()+rc.getId()+" "+service);
				}
				return gs;
			}
		}
		return null;
	}
 
}