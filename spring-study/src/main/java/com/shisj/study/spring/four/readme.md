# BeanFactory的生命周期

```
[invoke] MyInstantiationAwareBeanProcessor postProcessBeforeInstantiation()
brand is null color is null maxSpeed is0
[invoke] MyInstantiationAwareBeanProcessor postProcessAfterInstantiation()
[invoke-begin] MyInstantiationAwareBeanProcessor postProcessPropertyValues()
brand  红旗CA72
color  黑色
maxSpeed  250
[invoke-end] MyInstantiationAwareBeanProcessor postProcessPropertyValues()

[invoke] BeanNameAware setBeanName()
[invoke] BeanFactoryAware setBeanFactory()

[invoke]BeanPostProcessor postProcessBeforeInitialization（），颜色设置为黑色
[invoke] InitializingBean afterPropertiesSet()
[invoke] init-method myInit()
[invoke]BeanPostProcessor postProcessAfterInitialization（），将maxSpeed调整为200
brand is 红旗CA72 color is 黑色 maxSpeed is200
car1 == car2 :true
[invoke] DisposableBean destroy()
[invoke] destory-method myDistory()
```



# ApplicationContext的生命周期

```
[invoke] MyBeanFactoryPostProcessor postProcessBeanFactory() 

[invoke] MyInstantiationAwareBeanProcessor postProcessBeforeInstantiation()
brand is null color is null maxSpeed is0
[invoke] MyInstantiationAwareBeanProcessor postProcessAfterInstantiation()

[invoke-begin] MyInstantiationAwareBeanProcessor postProcessPropertyValues()
brand  奇瑞QQ
color  黑色
maxSpeed  250
[invoke-end] MyInstantiationAwareBeanProcessor postProcessPropertyValues()

[invoke] BeanNameAware setBeanName()
[invoke] BeanFactoryAware setBeanFactory()
[invoke] setApplicationContext()

[invoke]BeanPostProcessor postProcessBeforeInitialization（），颜色设置为黑色
[invoke] InitializingBean afterPropertiesSet()
[invoke] init-method myInit()
[invoke]BeanPostProcessor postProcessAfterInitialization（），将maxSpeed调整为200
brand is 奇瑞QQ color is 黑色 maxSpeed is200
[invoke] DisposableBean destroy()
[invoke] destory-method myDistory()
```

# 总结

* BeanFactoryPostProcessor ApplicationContext加载BeanDefinition后就会调用
* InstantiationAwareBeanPostProcessorAdapter BeanFactory实例化前后会调用
* BeanPostProcessor BeanFactory在initializingBean和init-method之间调用

对于BeanFactory来说，需要使用来添加
```java
beanFactory.addBeanPostProcessor(new MyBeanPostProcess());
```

对于ApplicationContext，在xml中配置即可
```java
<bean id="myInstantiationAwareBeanProcessor" class="com.shisj.study.spring.four.MyInstantiationAwareBeanProcessor"/>
    <bean id="myBeanFactoryPostProcessor" class="com.shisj.study.spring.four.MyBeanFactoryPostProcessor"/>
    <bean id="myBeanPostProcess" class="com.shisj.study.spring.four.MyBeanPostProcess"/>
```
