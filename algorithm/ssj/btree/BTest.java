package com.ssj.btree;

import java.io.File;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.LineNumberReader;
import java.util.Random;

import com.ssj.btree.BinaryArray.Keyed;

/**
 * 
 * @author shisj
 *
 */
public class BTest {
	
	public static void main(String[] args) {
		StringBuffer sb=new StringBuffer();
		
		// random source
		int count=1000;
		int a[]=new int[count];
		for(int i=0;i<count;i++){
			a[i]=new Random().nextInt(count*3);
			sb.append(a[i]+" ");
		}
		
//		//read from file,just for debug
//		String datArr[] = null;
//		try {
//			datArr = getData();
//		} catch (IOException e1) {
//			// TODO Auto-generated catch block
//			e1.printStackTrace();
//			return;
//		}
//		int count=datArr.length;
//		int a[]=new int[count];
//		for(int i=0;i<datArr.length;i++){
//			a[i]=Integer.valueOf(datArr[i]);
//		}
		
		//��ʼ����
		
		long begin=System.currentTimeMillis();
		//add to binaryArray
		BinaryArray array=new BinaryArray(count);
		for(int j=0;j<a.length;j++){
			
			array.add(new Data(a[j]));
		}
		long end=System.currentTimeMillis();
		System.out.println("Binary insert:"+(end-begin));
		
		
		begin=System.currentTimeMillis();
		//add to
		BTreeNode root=new BTreeNode();
		for(int j=0;j<a.length;j++){
			if(a[j]==989){
				System.out.println(22);
			}
			root.insert(a[j],j+"");
		}
		end=System.currentTimeMillis();
		System.out.println("B-tree insert:"+(end-begin));
		
		//�Ա����
//		StringBuffer sb1=new StringBuffer();
//		StringBuffer sb2=new StringBuffer();
//		Keyed list[]=array.getList();
//		for(int i=0;i<array.size();i++){
//			Data dat=(Data) list[i];
//			sb1.append(dat.getKey()+" ");
//		}
//		sb2=root.printData(sb2);
//		boolean flag=sb1.toString().equals(sb2.toString());
		
		try {
//			write("sb",sb.toString());
//			write("sb1",sb1.toString());
//			write("sb2",sb2.toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}
	
	private static String[] getData() throws IOException{
		File file =new File("D:\\sb");
		FileReader rd=new FileReader(file);
		
		LineNumberReader lrd=new LineNumberReader(rd);
		
		String line=lrd.readLine();
		
		return line.split(" ");
		
	}
	
	private static void write(String name,String cnt) throws IOException{
		File file =new File("D:\\"+name);
		FileWriter writer=new FileWriter(file);
		
		writer.write(cnt);
		writer.close();
	}
}

class Data implements Keyed{
	int key;
	public Data(int key){
		this.key=key;
	}
	@Override
	public int getKey() {
		// TODO Auto-generated method stub
		return key;
	}
	
}
