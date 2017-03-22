import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.alibaba.dubbo.demo.CacheService;

public class CacheConsumer {
    
    public static void main(String[] args) throws Exception {
    	 ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"consumer.xml"});
         context.start();
        
        CacheService cacheService = (CacheService)context.getBean("cacheService");

        // ���Ի�����Ч����ε��÷���ͬ���Ľ����(������������������ֵ)
        String fix = null;
        for (int i = 0; i < 5; i ++) {
            String result = cacheService.findCache("0");
            if (fix == null || fix.equals(result)) {
                System.out.println("OK: " + result);
            } else {
                System.err.println("ERROR: " + result);
            }
            fix = result;
            Thread.sleep(500);
        }
        System.out.println();
        // LRU��ȱʡcache.sizeΪ1000��ִ��1001�Σ�Ӧ�����
        for (int n = 0; n < 1001; n ++) {
            String pre = null;
            for (int i = 0; i < 10; i ++) {
                String result = cacheService.findCache(String.valueOf(n));
                if (pre != null && ! pre.equals(result)) {
                    System.err.println("ERROR: " + result);
                }
                pre = result;
            }
        }
        System.out.println();
        // ����LRU���Ƴ��ʼ��һ��������
        String result = cacheService.findCache("0");
        if (fix != null && ! fix.equals(result)) {
            System.out.println("OK: " + result);
        } else {
            System.err.println("ERROR: " + result);
        }
    }

}