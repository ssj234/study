# 方法注入

修改实例的方法的行为,下面的例子中PropertyValue是spring自带的类，对这个实例的getValue方法进行了修改  

NewBean实现了MethodReplacer接口，内部会修改getValue的行为
```xml
<bean id="propertyValue" class="org.springframework.beans.PropertyValue">
    <constructor-arg index="0" value="key"/>
    <constructor-arg index="1" value="value"/>
    <replaced-method name="getValue" replacer="newBean"/>
</bean>
    
<bean id="newBean" class="com.shisj.study.spring.five.NewBean"></bean>
```


# 基于注解的配置

* Component  用于对通用类实现标注
* Repository 用于对DAO实现标注
* Service  用于对业务层实现标注
* Controller 用于对控制器实现标注

这几个注解的功能是一样的，名字不同是为了标识类的功能，使用注解时需要设置要扫描的包名

base-package可以设置基础包名，会扫描该包及其子包下的所有类，如果想要过滤某些类，可以使用resource-pattern属性  
resource-pattern如果不设置，默认是`**/*.class`，即包下的所有类，而`five/*.class`是five子包下的所有类

```xml
<context:component-scan base-package="com.shisj.study.spring.five"/>
<context:component-scan base-package="com.shisj.study.spring" resource-pattern="five/*.class"/>
```
resource-pattern很多情况下不能满足要求，例如标注了某个注解的类，继承了某个类的类等，可以使用

```xml
<context:component-scan base-package="com.shisj.study.spring" resource-pattern="five/*.class">
    <context:include-filter type="annotation" expression="org.springframework.stereotype.Service" />
    <context:exclude-filter type="annotation" expression="org.springframework.stereotype.Repository" />
</context:component-scan>
```

上面的例子排除了@Repository标注的类，包含@Component，@Service，@Controller这些类，如果不想包含这些，需要将use-default-filters设置为false。


* annotation  所有标注了expression指定的类
* assignable  com.smart.ABCService 所有继承或扩展expression指定的类
* aspectj com.smart..*Service+  所有类名以Service结尾的类及继承或扩展他们的类
* regex  所有使用正则表达式expression匹配的类
* custom  expression指定的了实现org.springframework.core.type.TypeFilter接口，里面进行过滤


# 自动装配

@Autowire 默认按照类型装配，只有一个时会注入，有多个时候会报错
@Autowire(required=false) 如果容器中没有找到自动注入的Bean，会报错，设置为false后就不会报错了，因此默认的required为true
@Qualifier("userDao") 指定注入Bean的名称

@Autowire 可以对变量和方法进行标注

```java
// 一个参数的情况
@Autowire
public void setLoginDao(LoginDao dao){
    
}

@Autowire
@Qualifier("loginDao")
public void setLoginDao(LoginDao dao){
    
}

// 多个参数的情况
@Autowire
public void setLoginDao(@Qualifier("loginDao") LoginDao dao,@Qualifier("userDao") UserDao userDao){
    
}

```