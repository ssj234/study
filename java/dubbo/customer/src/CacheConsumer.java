import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.alibaba.dubbo.demo.CacheService;

public class CacheConsumer {
    
    public static void main(String[] args) throws Exception {
    	 ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext(new String[] {"consumer.xml"});
         context.start();
        
        CacheService cacheService = (CacheService)context.getBean("cacheService");

        // 测试缓存生效，多次调用返回同样的结果。(服务器端自增长返回值)
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
        // LRU的缺省cache.size为1000，执行1001次，应有溢出
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
        // 测试LRU有移除最开始的一个缓存项
        String result = cacheService.findCache("0");
        if (fix != null && ! fix.equals(result)) {
            System.out.println("OK: " + result);
        } else {
            System.err.println("ERROR: " + result);
        }
    }

}