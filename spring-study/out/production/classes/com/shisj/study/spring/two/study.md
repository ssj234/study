# Resource接口
为应用提供了更强的访问底层资源的能力

* ClassPathResource 类路径下的资源，以相对于类路径的方式表示
* FileSystemResource 文件系统资源
* ServletContextResource web容器上下文的资源
* UrlResource 能够访问可以通过URL表示的资源，如文件系统的资源，FTP，HTTP资源
* PathResource 封装了URL，Path，系统文件路径表示的资源，如文件系统的资源，FTP，HTTP资源


# 资源加载

* classpath: 从类路径中加载资源，classpath:和classpath:/是等价的，都是想对于类的根路径，资源文件可以在文件系统中，也可以在jar或zip中，如果多个jar包中有相同路径的资源只会查找第一次加载的，而classpath*:会从所有jar中获取
* file: 从文件系统加载资源
* http:// 
* ftp://
* 没有前缀，使用ApplicationContext的实现类，如XmlClasspathContext或ServletContext获取

# 资源匹配符

* ？ 匹配文件名中的一个字符
* \*  匹配文件名中的任意字符
* \** 匹配多层路径

对于classpath:/org/**/bla.xml来说，可以匹配`/org/bla.xml`，也可以匹配`/org/abc/bla.xml`，也可匹配`/org/abc/def/hig/bla.xml`

ResourceLoader接口的getResource方法仅仅支持带资源类型前缀的表达式，不支持资源路径表达式。  
ResourcePatternResolver接口支持带资源类型前缀及资源路径表达式，PathMatchingResourcePatternResolver是实现类。  

