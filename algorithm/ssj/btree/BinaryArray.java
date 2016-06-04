package com.ssj.btree;


import java.util.ArrayList;

import com.ssj.btree.BinaryArray.Keyed;


/**
 * 二分数组
 * @author shishengjie
 *
 */
public class BinaryArray {

	public Keyed datas[]=null;
	public int size=0;
	
	public interface Keyed{
		public int getKey();
	}
	
	public BinaryArray(int size){
		datas=new Keyed[size];
	}
	
	public void remove(int index){
		if(index<0||index>=size)return;//不在正确的区间内
		
		for(int j=index;j<size-1;j++){
			datas[j]=datas[j+1];
		}
		datas[size-1]=null;
		size--;
	}
	
	public void setNull(int index){
		datas[index]=null;
	}
	public void setSize(int size){
		this.size=size;
	}
	
	public void add(Keyed keyed){
		int pos=0;
		int key=keyed.getKey();
		if(size==datas.length)return;//满了返回
		for(pos=0;pos<size;pos++){
			if(datas[pos].getKey()>key){
				break;
			}
		}
		//开始后移，从后向前
		
		for(int j=size;j>pos;j--){
			datas[j]=datas[j-1];
		}
		datas[pos]=keyed;
		size++;
	}
	/**
	 * 二分查找
	 * @param key
	 * @return
	 */
	public Keyed search(int key){
		return search(key,0,size-1);
	}
	private Keyed search(int key,int begin,int end){
		int mid=begin+(end-begin)/2;
		
		if(end==begin){
			if(datas[begin].getKey()==key)
				return datas[begin];
			else
				return null;
		}
		
		if(datas[mid].getKey()==key){
			return datas[mid];
		}else if(datas[mid].getKey()>key){
			return search(key, begin, mid);
		}else{
			return search(key, mid+1, end);
		}
		
		
	}
	
	public Keyed[] getList(){
		return datas;
	}
	
	public int size(){
		return size;
	}
	
	public static void main(String[] args) {
		BinaryArray array=new BinaryArray(14);
		array.add(new KeyedData(11,"11"));
		array.add(new KeyedData(58,"58"));
		array.add(new KeyedData(12,"12"));
		array.add(new KeyedData(22,"22"));
		array.add(new KeyedData(52,"52"));
		array.add(new KeyedData(41,"41"));
		array.add(new KeyedData(8,"8"));
		
		array.add(new KeyedData(61,"61"));
		array.add(new KeyedData(17,"17"));
		array.add(new KeyedData(23,"23"));
		array.add(new KeyedData(16,"16"));
		array.add(new KeyedData(31,"31"));
		array.add(new KeyedData(59,"59"));
		array.add(new KeyedData(18,"18"));
		
		array.remove(13);
		
		Keyed list[]=array.getList();
		for(int i=0;i<array.size();i++){
			KeyedData dat=(KeyedData) list[i];
			System.out.println(dat.getName());
		}
		
		Keyed ret=array.search(22);
		if(ret!=null)
			System.out.println("find it:"+ret.getKey());
		else
			System.out.println("can not find!");
	}

	public Keyed get(int index) {
		if(index<0||index>=size)return null;
		
		return datas[index];
	}

}

class KeyedData implements Keyed{
	
	private int key=0;
	private String name;
	
	public KeyedData(int key,String name){
		this.key=key;
		this.name=name;
	}
	@Override
	public int getKey() {
		return key;
	}
	
	public String getName(){
		return name;
	}
	
}
