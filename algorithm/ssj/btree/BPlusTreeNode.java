package com.ssj.btree;

import java.util.ArrayList;

import com.ssj.btree.BinaryArray.Keyed;


public class BPlusTreeNode {

	public final static int M=250;//3��
	public BPlusTreeNode parent=null;//���ڵ�
	public ArrayList<BPlusTreeNode> sons=null;//�ӽڵ�
	public ArrayList<Integer> keys=null;//�ؼ���
	public BinaryArray datas=null;//�������
	public boolean isData=false;//�Ƿ������ݽڵ�
	public BPlusTreeNode(){
		sons=new ArrayList<BPlusTreeNode>(M);
		keys=new ArrayList<Integer>(M);
		datas=new BinaryArray(M);
	}

	
	public void insert(int key,String value){
		//1.�ȸ���key�ҵ�λ��
		BPlusTreeNode pos=this.getPosition(key);
		
		//2.�ҵ��Ŀ϶������ݽڵ�,����������
		boolean flag=pos.addToDataList(key,value);
		
		if(!flag){//ʧ�ܣ��Ѿ�����,��Ҫ����
			split(pos, key, value);
		}
		
	}
	
	
	private void debug(BPlusTreeNode node){
		BinaryArray array=node.datas;
		for(int i=0;i<array.size();i++){
			int d=array.get(i).getKey();
			System.out.print(d+" ");
		}
		System.out.println();
	}
	/**
	 * ��������ݲ�ֵ��ұ�
	 * @param left
	 * @param right
	 */
	private void splitData(BPlusTreeNode left,BPlusTreeNode right,int key,String value){
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
		if(key>lastKey){//key������ߵ����һ����������ұ�
			right.addToDataList(key, value);
		}else{
			//ȡ������һ��Ԫ�أ���
			Keyed obj=left.datas.get(begin-1);
			left.datas.remove(begin-1);
			right.datas.add(obj);
			left.addToDataList(key, value);
		}
		
	}
	
	/**
	 * ����node��key
	 * @param pos
	 */
	private void setNodeKey(BPlusTreeNode pos){
		int size=pos.sons.size(),index=size-2;
		if(size>1){//����size-2��key
//			int key=pos.sons.get(size-1).datas.get(0).getKey();
			BPlusTreeNode tmp=pos.sons.get(size-1);
			while(!tmp.isData){
				tmp=tmp.sons.get(0);
			}
			int key=tmp.datas.get(0).getKey();
			//if(index<keys.size())
			pos.keys.add( key);
		}
	}
	
	private void split(BPlusTreeNode pos,int key,String value){
		BPlusTreeNode parent=pos.parent;
		int sonSize=parent.sons.size();
		BPlusTreeNode newNode=new BPlusTreeNode();
		newNode.isData=true;//�����ݽڵ�
		splitData(pos,newNode,key, value);//�����½ڵ�
		newNode.parent=parent;//�����½ڵ�ĸ��ڵ�
		
		//����һ��parent��lastson����Сֵ
		int set=getIndex(pos, parent);//pos��parent��index������index=sonSize-1,��ӵ�������һ��son
		
		if(sonSize<M&&set==sonSize-1){//�����ڵ㻹���Լ����ӽڵ㣬���´����Ľڵ���븸��
			//������߼����ԣ�
			parent.sons.add(newNode);
			
			setNodeKey(parent);//���ø��ڵ��key
		}else{
			BPlusTreeNode middle=new BPlusTreeNode();//�м�ڵ�
			middle.parent=parent;
			
			//���ø��ڵ�,Ӧ�����õ�
			
			parent.sons.set(set, middle);
			newNode.parent=middle;
			pos.parent=middle;
			middle.sons.add(pos);
			middle.sons.add(newNode);
			//���ýڵ�Ĺؼ���
			setNodeKey(middle);
		}
	}
	
	private int getIndex(BPlusTreeNode pos, BPlusTreeNode parent){
		int set=-1;
		for(int i=0;i<parent.sons.size();i++){
			BPlusTreeNode node=parent.sons.get(i);
			if(node==pos){
				set=i;break;
			}
		}
		return set;
	}
	
	/**
	 * ��������ӵ������б��У������޸�Ϊ��������
	 * @param key
	 * @return
	 */
	private boolean addToDataList(int key,String value){
		int size=datas.size();
		if(size<M){
			datas.add(new MyData(key,value));
			return true;
		}
		return false;//���ʧ��
	}
	
	/**
	 * ����key�͹ؼ��ֻ�ȡӦ�����λ��
	 * @param key
	 * @return
	 */
	public BPlusTreeNode getPosition(int key){
		BPlusTreeNode ret=null;
		int i=0;
		if(isData){//���ڵ����ڱ������ݣ���ô��������ڵ���
			return this;
		}
		for(i=0;i<keys.size();i++){//���ұ�����ڵ�ؼ���С��λ��
			if(key<keys.get(i)){
				ret=sons.get(i);
				break;
			}
		}
		if(ret==null){//��δ�ҵ���keyС����ʱ��� ȡ���һ���ӽڵ�
			if(i<sons.size()){
				ret=sons.get(i);//�״μ��룬û��sons
			}
				
		}
		
		if(ret!=null){
			return ret.getPosition(key);
		}else{//��Ϊ��,����һ���½ڵ㣬�������丸�ڵ㣬���ø��ڵ���ӽڵ�
			BPlusTreeNode newNode=new BPlusTreeNode();
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
		for(BPlusTreeNode node:this.sons){
			System.out.print(" ");
			node.print();
		}
	}
	
	private void printData(){
		
		for(BPlusTreeNode node:this.sons){
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

		for(BPlusTreeNode node:this.sons){
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
		BPlusTreeNode root=new BPlusTreeNode();
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
