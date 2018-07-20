# 属性文件


注入数据库配置，电子邮箱等相关配置需要维护在一个单独的文件中，一来可以减少维护的工作量，二来使部署更简单。

Spring使用PropertyPlaceholderConfigurer，实现了BeanFactoryPostProcessorBean接口，可以将占位符${}进行替换。

* locations 可以指定多个属性文件  
* order 如果配置文件中定义了多个PropertyPlaceholderConfigurer，可以指定优先顺序，值越小优先级越高  
* placeholderPrefix placeholderSuffix 指定占位符的前缀和后缀  

```xml
<spring:bean id="propertyConfigurer"
          class="org.springframework.beans.factory.config.PropertyPlaceholderConfigurer">
        <!--<property name="order" value="1" />
        <property name="ignoreUnresolvablePlaceholders" value="true" />-->
        <spring:property name="locations">
            <spring:list>
                <spring:value>classpath:config/main/dubbo.properties</spring:value>
                <spring:value>classpath:config/main/db.properties</spring:value>
                <spring:value>classpath:config/main/common.properties</spring:value>
            </spring:list>
        </spring:property>
    </spring:bean>
    
```


## 注解使用占位符

```java
@Value("${driverClassName}");
```

## 属性文件自身的引用

属性文件中使用${}可以引用其他的属性

```txt
dbName=sampledb
url=jdbc:mysql://localhost:3306/${dbName}
```


# 国际化

## Locale

Local表示语言和国家/地区信息的本地化类  
可以通过 -Duser.language=en -Duser.region=US修改默认设置
```java
Locale locale = new Locale("zh","CN");
```

## 本地化工具类

* NumberFormat 对货币金额进行本地化展现
* DateFormat 对日期进行本地化展现
* MessageFormat  对指定消息进行本地化展现

# 容器事件

首先定义事件，MailSendEvent extends ApplicationContextEvent
ApplicaitonContext的publishEvent发送事件，需要加入到xml配置
ApplicationListener会监听事件，收到事件后执行相应的动作


