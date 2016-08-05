package com.ssj.btree;

import java.util.ArrayList;

import com.ssj.btree.BinaryArray.Keyed;


public class BTreeNode {

	public final static int M=250;//3阶
	public BTreeNode parent=null;//父节点
	public ArrayList<BTreeNode> sons=null;//子节点
	public ArrayList<Integer> keys=null;//关键字
	public BinaryArray datas=null;//存放数据
	public boolean isData=false;//是否是数据节点
	public BTreeNode(){
		sons=new ArrayList<BTreeNode>(M);
		keys=new ArrayList<Integer>(M-1);
		datas=new BinaryArray(M);
	}

	
	public void insert(int key,String value){
		//1.先根据key找到位置
		BTreeNode pos=this.getPosition(key);
		
		//2.找到的肯定是数据节点,将其加入队列
		boolean flag=pos.addToDataList(key,value);
		
		if(!flag){//失败，已经满了,需要分裂
			split(pos, key, value);
		}
		
	}
	
	
	private void debug(BTreeNode node){
		BinaryArray array=node.datas;
		for(int i=0;i<array.size();i++){
			int d=array.get(i).getKey();
			System.out.print(d+" ");
		}
		System.out.println();
	}
	/**
	 * 将左边数据拆分到右边
	 * @param left
	 * @param right
	 */
	private void splitData(BTreeNode left,BTreeNode right,int key,String value){
		int index,begin=(M+1)/2;
//		System.out.println("before");
//		debug(left);
		for(index=begin;index<M;index++){
			MyData data=(MyData) left.datas.get(index);
			right.datas.add(data);
			left.datas.setNull(index);
		}
		left.datas.setSize(begin);
		
//		System.out.println("end");
//		debug(left);
//		debug(right);
		
		int lastKey=left.datas.get(begin-1).getKey();
		if(key>lastKey){//key大于左边的最后一个，则加入右边
			right.addToDataList(key, value);
		}else{
			//取左边最后一个元素，将
			Keyed obj=left.datas.get(begin-1);
			left.datas.remove(begin-1);
			right.datas.add(obj);
			left.addToDataList(key, value);
		}
		
	}
	
	/**
	 * 设置node的key
	 * @param pos
	 */
	private void setNodeKey(BTreeNode pos){
		int size=pos.sons.size(),index=size-2;
		if(size>1){//设置size-2的key
//			int key=pos.sons.get(size-1).datas.get(0).getKey();
			BTreeNode tmp=pos.sons.get(size-1);
			while(!tmp.isData){
				tmp=tmp.sons.get(0);
			}
			int key=tmp.datas.get(0).getKey();
			//if(index<keys.size())
			pos.keys.add( key);
		}
	}
	
	private void split(BTreeNode pos,int key,String value){
		BTreeNode parent=pos.parent;
		int sonSize=parent.sons.size();
		BTreeNode newNode=new BTreeNode();
		newNode.isData=true;//是数据节点
		splitData(pos,newNode,key, value);//放入新节点
		newNode.parent=parent;//设置新节点的父节点
		
		//查找一下parent的lastson的最小值
		int set=getIndex(pos, parent);//pos是parent的index个，若index=sonSize-1,添加到父的下一个son
		
		if(sonSize<M&&set==sonSize-1){//若父节点还可以加入子节点，将新创建的节点放入父中
			//这里的逻辑不对，
			parent.sons.add(newNode);
			
			setNodeKey(parent);//设置父节点的key
		}else{
			BTreeNode middle=new BTreeNode();//中间节点
			middle.parent=parent;
			
			//设置父节点,应该设置到
			
			parent.sons.set(set, middle);
			newNode.parent=middle;
			pos.parent=middle;
			middle.sons.add(pos);
			middle.sons.add(newNode);
			//设置节点的关键字
			setNodeKey(middle);
		}
	}
	
	private int getIndex(BTreeNode pos, BTreeNode parent){
		int set=-1;
		for(int i=0;i<parent.sons.size();i++){
			BTreeNode node=parent.sons.get(i);
			if(node==pos){
				set=i;break;
			}
		}
		return set;
	}
	
	/**
	 * 将数据添加到数据列表中，后续修改为有序数组
	 * @param key
	 * @return
	 */
	private boolean addToDataList(int key,String value){
		int size=datas.size();
		if(size<M){
			datas.add(new MyData(key,value));
			return true;
		}
		return false;//添加失败
	}
	
	/**
	 * 根据key和关键字获取应放入的位置
	 * @param key
	 * @return
	 */
	public BTreeNode getPosition(int key){
		BTreeNode ret=null;
		int i=0;
		if(isData){//若节点用于保存数据，那么就是这个节点了
			return this;
		}
		for(i=0;i<keys.size();i++){//查找比这个节点关键字小的位置
			if(key<keys.get(i)){
				ret=sons.get(i);
				break;
			}
		}
		if(ret==null){//若未找到比key小的则时最大 取最后一个子节点
			if(i<sons.size()){
				ret=sons.get(i);//首次加入，没有sons
			}
				
		}
		
		if(ret!=null){
			return ret.getPosition(key);
		}else{//若为空,创建一个新节点，并设置其父节点，设置父节点的子节点
			BTreeNode newNode=new BTreeNode();
			newNode.parent=this;
			sons.add(newNode);
			newNode.isData=true;
			return newNode;
		}
	}
	
	private void print(){
		for(Integer key:this.keys){
			System.out.print(key+" ");
		}
		for(BTreeNode node:this.sons){
			System.out.print(" ");
			node.print();
		}
	}
	
	private void printData(){
		
		for(BTreeNode node:this.sons){
			if(node.isData){
				for(int i=0;i<node.datas.size();i++){
					MyData dat=(MyData)node.datas.get(i);
					System.out.print(dat.getValue()+" ");
				}
			}else{
				node.printData();
			}
		}
	}
	
	public StringBuffer printData(StringBuffer sb){

		for(BTreeNode node:this.sons){
			if(node.isData){
				for(int i=0;i<node.datas.size();i++){
					MyData dat=(MyData)node.datas.get(i);
					sb.append(dat.getKey()+" ");
//					System.out.println(dat.getKey());
				}
			}else{
				sb=node.printData(sb);
			}
		}
		return sb;
	}
	
	public static void main(String[] args) {
		BTreeNode root=new BTreeNode();
		root.insert(58, "58");
		root.insert(11, "11");
		root.insert(12, "12");
		root.insert(22, "22");
		root.insert(52, "52");
		root.insert(41, "41");
		root.insert(8, "8");
		
		root.insert(61, "61");
		root.insert(17, "17");
		root.insert(23, "23");
		root.insert(16, "16");
		root.insert(31, "31");
		root.insert(59, "59");
		root.insert(18, "18");
		
//		root.print();//key
		root.printData();
	}
	
}
class MyData implements Keyed{
	int key;
	String value;
	
	public MyData(int key,String value){
		this.key=key;
		this.value=value;
	}
	
	public int getKey() {
		return key;
	}
	public void setKey(int key) {
		this.key = key;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	
}
