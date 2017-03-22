# dubbo

http://dubbo.io/User+Guide-zh.htm

## 概述

服务路由
服务注册与发现
服务测试
流量控制

## 角色

* provider：服务提供者，向注册中心注册自己提供的服务
* consumer：服务消费者，从注册中心拉取需要的服务
* register：注册中心，保存服务提供者和消费者元数据
* monitor：监控中心，统计服务调用次数和时间
* Container：服务允许的容器

provider、consumer、register三者之间通过长连接通信，定期向monitor发送信息。register和monitor是可选的，provider和consumer之间可以直接连接。


## 配置

**集群容错**

* 失败自动切换，默认的
* 快速失败，失败就返回
* 失败安全，失败时忽略
* 失败自动回复，定时重发
* 并行调用多个服务，一个返回即成功
* 广播调用，任意一台报错则报错

**负载均衡**

* Random  随机选择，按照权重产生概率，可以修改权重
* RoundRobin  轮询选择，缺点：如果第N台服务器很慢，则会卡在第二台上
* LeastActive  最少活跃调用，使慢的服务提供者处理的请求更少。
* ConsistentHash  当某一台提供者挂时，原本发往该提供者的请求，基于虚拟节点，平摊到其它提供者，不会引起剧烈变动。


## 线程模型

用户线程/IO线程


## 缓存
引用时指定cache的类型：
* lru 基于最近最少使用原则删除多余缓存，保持最热的数据被缓存。
* threadlocal 当前线程缓存，比如一个页面渲染，用到很多portal，每个portal都要去查用户信息，通过线程缓存，可以减少这种多余访问
* jcache 与JSR107集成，可以桥接各种缓存实现。
```
provider不需要进行特殊标记

consumer端：
<!--引用缓存服务-->
<dubbo:reference id="cacheService" interface="com.alibaba.dubbo.demo.CacheService" cache="lru" />
```

## 泛化

```
<!--定义泛化服务-->
<bean id="genericService" class="com.alibaba.dubbo.demo.provider.MyGenericService" />
<dubbo:service interface="com.alibaba.dubbo.rpc.service.GenericService" ref="genericService" />


<!--引用缓存服务-->
<dubbo:reference id="cacheService" interface="com.alibaba.dubbo.demo.CacheService" cache="lru" />

//consumer中使用
GenericService genericService = (GenericService)context.getBean("genericService"); 
String hello = (String) genericService.$invoke("world....",null,null); 
System.out.println( hello );    
```

## stub

stub是在consumer端再加一层代理，使之能够进入拦截

```
provider端，正常定义
<!--定义stub服务-->
<bean id="dStubService" class="com.alibaba.dubbo.demo.provider.DStubServiceImpl" />
<dubbo:service interface="com.alibaba.dubbo.demo.DStubService" ref="dStubService" />

consumer端：指定了stub的类
<!--引用stub服务-->
<dubbo:reference id="dStubService" interface="com.alibaba.dubbo.demo.DStubService" stub="com.alibaba.dubbo.demo.stub.DStubServiceStub" />
    
```

consumer端的DStubServiceStub 
```
public class DStubServiceStub implements DStubService {
    private DStubService dStubService;
    public DStubServiceStub(DStubService dStubService){
        this.dStubService = dStubService;
    }
    @Override
    public String sayHello(String name) {
        System.out.println("before invoke remote sayHello!");
        String ret = dStubService.sayHello(name);
        System.out.println("after invoke remote sayHello!" + ret);
        return ret;
    }
}
```

## 直连方式

在<dubbo:reference>中配置url指向提供者，将绕过注册中心，多个地址用分号隔开
```
<dubbo:reference id="xxxService" interface="com.alibaba.xxx.XxxService" url="dubbo://localhost:20890" />
```

## 上下文信息
RpcContext是一个ThreadLocal的临时状态记录器，当接收到RPC请求，或发起RPC请求时，RpcContext的状态都会变化。
```
boolean isConsumerSide = RpcContext.getContext().isConsumerSide(); // 本端是否为消费端，这里会返回true
String serverIP = RpcContext.getContext().getRemoteHost(); // 获取最后一次调用的提供方IP地址
String application = RpcContext.getContext().getUrl().getParameter("application"); // 获取当前服务配置信息，所有配置信息都将转换为URL的参数
```

```
boolean isProviderSide = RpcContext.getContext().isProviderSide(); // 本端是否为提供端，这里会返回true
String clientIP = RpcContext.getContext().getRemoteHost(); // 获取调用方IP地址
String application = RpcContext.getContext().getUrl().getParameter("application"); // 获取当前服务配置信息，所有配置信息都将转换为URL的参数
```

## 异步调用

指定async="true"
```
<dubbo:reference id="barService" interface="com.alibaba.bar.BarService">
      <dubbo:method name="findBar" async="true" />
</dubbo:reference>
```

```
fooService.findFoo(fooId); // 此调用会立即返回null
Future<Foo> fooFuture = RpcContext.getContext().getFuture(); // 拿到调用的Future引用，当结果返回后，会被通知和设置到此Future。
Foo foo = fooFuture.get(); //阻塞等待返回
```