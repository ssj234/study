import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.atomic.AtomicInteger;


public class SingletonWrapper {
	public static void main(String[] args) {
		final MyBlockingQueue<String> queue=new MyBlockingQueue<String>(5);
		queue.add("s1");
		queue.add("s2");
		queue.add("s3");
		queue.add("s4");
		queue.add("s5");
		
		Thread t1=new Thread(new Runnable() {
			
			@Override
			public void run() {
				queue.add("d1");
				queue.add("d2");
			}
		});
		Thread t2=new Thread(new Runnable() {
			
			@Override
			public void run() {
				try {
					Thread.sleep(2000);
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
				queue.take();
				queue.take();
			}
		});
		
		t1.start();
		t2.start();
		
	}
}


class MyBlockingQueue<T>{
	int count=0;
	AtomicInteger size=new AtomicInteger(0);
	ConcurrentLinkedQueue<T> queue=new ConcurrentLinkedQueue<T>();
	Object lock=new Object();
	
	public MyBlockingQueue(int count){
		this.count = count;
	}
	
	
	public  T take(){
		synchronized(lock){
			while(size.get() == 0){
				try {
					lock.wait();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			lock.notifyAll();
			T t=queue.poll();
			System.out.println("take " + t);
			size.getAndDecrement();
			return t;
		}
	}
	
	public  void add(T t){
		synchronized(lock){
			while(size.get() == count){
				try {
					lock.wait();
				} catch (InterruptedException e) {
					e.printStackTrace();
				}
			}
			lock.notifyAll();
			queue.add(t);
			System.out.println("add " + t);
			size.getAndIncrement();
		}
	}
}