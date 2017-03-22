

import java.util.List;

import org.apache.zookeeper.CreateMode;
import org.apache.zookeeper.WatchedEvent;
import org.apache.zookeeper.Watcher;
import org.apache.zookeeper.ZooDefs.Ids;
import org.apache.zookeeper.ZooKeeper;
import org.apache.zookeeper.data.ACL;

public class ZkTool {
	// ������Ϣ
	private final static String TOOL_NAME = "ZooKeeper���� ";
	private final static String TOOL_VERSION = "V0.1";
	private final static String TOOL_AUTHOR = "Jason Chen";
	private final static String TOOL_COPYRIGHT = "?2012 Jason ��Ȩ����";

	// ���������
	private final static int ACTION_QUERY = 1;
	private final static int ACTION_CREATE = 2;
	private final static int ACTION_MODIFY = 3;
	private final static int ACTION_DELETE = 4;
	private final static int ACTION_CONFIG = 8;
	private final static int ACTION_ABOUT = 9;
	private final static int ACTION_QUIT = 0;

	// Ĭ��������Ϣ
	private final static String DEFAULT_HOST = "197.3.135.86";
	private final static int DEFAULT_PORT = 2181;
	private final static int DEFAULT_TIMEOUT = 30000;

	// ��ǰ������Ϣ
	private static String zkHost = DEFAULT_HOST;
	private static int zkPort = DEFAULT_PORT;
	private static int zkTimeout = DEFAULT_TIMEOUT;
	
	private static ZooKeeper zooKeeper = null;

	public static void main(String[] args) {
		try {
			openZk();
			
			StartMenu();
			while (true) {
				int operate = Integer.parseInt(getCommand());
				switch (operate) {
				case ACTION_QUERY:
					queryData();
					break;
				case ACTION_CREATE:
					createData();
					break;
				case ACTION_MODIFY:
					modifyData();
					break;
				case ACTION_DELETE:
					deleteData();
					break;
				case ACTION_CONFIG:
					configConnection();
					break;
				case ACTION_ABOUT:
					about();
					break;
				case ACTION_QUIT:
					exit();
					break;
				default:
					System.out.println("û�и����� " + operate);
					break;
				}
			}
		} catch (Exception e) {
			System.out.println("������󣬴�����Ϣ���£� ");
			e.printStackTrace();
		}
	}

	// ��ʼ�˵�
	public static void StartMenu() {
		System.out.println("**********" + TOOL_NAME + " " + TOOL_VERSION + "**********");
		System.out.println(ACTION_QUERY + "����ѯĿ¼��Ϣ");
		System.out.println(ACTION_CREATE + "������Ŀ¼�ڵ�");
		System.out.println(ACTION_MODIFY + "���޸�Ŀ¼�ڵ�");
		System.out.println(ACTION_DELETE + "��ɾ��Ŀ¼�ڵ�");
		System.out.println(ACTION_CONFIG + "������������Ϣ");
		System.out.println(ACTION_ABOUT + "�����ڳ���");
		System.out.println(ACTION_QUIT + "���˳�");
		System.out.println("********************************");
	}

	// ��ȡ������Ϣ
	public static String getCommand() {
		return getCommand("����������", 1);
	}

	public static String getCommand(String message) {
		return getCommand(message, null, 100);
	}

	public static String getCommand(String message, int limit) {
		return getCommand(message, null, limit);
	}

	public static String getCommand(String message, String defaultValue) {
		return getCommand(message, defaultValue, 100);
	}

	public static String getCommand(String message, String defaultValue, int limit) {
		String strCommand = "";
		try {
			do {
				System.out.println();
				if (defaultValue == null) {
					System.out.print(message + ": ");
				} else {
					System.out.print(message + " [" + defaultValue + "]: ");
				}

				byte[] command = new byte[100];
				System.in.read(command);
				strCommand = new String(command);
				strCommand = strCommand.replaceAll("\r\n", "").trim();
				// ������Ĭ��ֵ��ֱ������س�����ֱ��ʹ��Ĭ��ֵ��Ϊ����ֵ
				if (defaultValue != null && "".equals(strCommand)) {
					strCommand = defaultValue;
				}
			} while (strCommand.length() > limit);
		} catch (Exception e) {
			System.out.println("������󣡣���");
		}
		return strCommand;
	}

	public static void queryData() {
		System.out.println("*****��ѯĿ¼�ڵ�*****");
		
		String zpath = getCommand("Ŀ¼�ڵ�·��", "/App");
		
		try {
			openZk();
			
			// ȡ����Ŀ¼�ڵ��б�
			System.out.println(zooKeeper.getChildren(zpath, true));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void createData() {
		System.out.println("*****����Ŀ¼�ڵ�*****");
		
		String zpath = getCommand("Ŀ¼�ڵ�·��", "/App");
		String zdata = getCommand("Ŀ¼�ڵ�����", zpath);
		String zacl = getCommand("Ŀ¼�ڵ�Ȩ��", "0");
		String ztype = getCommand("Ŀ¼�ڵ�����", "E");
		
		try {
			openZk();
			
			zooKeeper.create(zpath, zdata.getBytes(), getAcl(zacl), getCreateMode(ztype));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public static void modifyData() {
		System.out.println("*****�޸�Ŀ¼�ڵ�*****");
		
		String zpath = getCommand("Ŀ¼�ڵ�·��", "/App");
		String zdata = getCommand("Ŀ¼�ڵ�����", zpath);
		
		try {
			openZk();
			
			zooKeeper.setData(zpath, zdata.getBytes(), -1);
			
			String parent = strLeft(zpath, "/");
			System.out.println("Ŀ¼�ڵ�״̬��[" + zooKeeper.exists(parent, false) + "]");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public static String strLeft( String text, String subtext) {
		if(!hasText(text) || !hasText(subtext)) {
			return "";
		}
		
		int find = text.indexOf(subtext);
		return (find!=-1) ? text.substring(0, find) : "";
	}
	private static boolean hasText(String text) {
		return (text!=null) && (!"".equals(text));
	}
	public static void deleteData() {
		System.out.println("*****ɾ��Ŀ¼�ڵ�*****");
		
		String zpath = getCommand("Ŀ¼�ڵ�·��", "/App");
		String zversion = getCommand("Ŀ¼�ڵ�·��", "-1");
		
		try {
			openZk();
			
			zooKeeper.delete(zpath, Integer.valueOf(zversion));
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/** ����������Ϣ */
	public static void configConnection() {
		System.out.println("*****����������Ϣ*****");
		do {
			zkHost = getCommand("�������������ַ", zkHost);
			zkPort = Integer.valueOf(getCommand("������˿�", "" + zkPort));
			zkTimeout = Integer.valueOf(getCommand("���������ӳ�ʱ", "" + zkTimeout));

			try {
				// ����һ���������������
				zooKeeper = new ZooKeeper(zkHost + ":" + zkPort, zkTimeout, new Watcher() {

					// ������б��������¼�
					public void process(WatchedEvent event) {
						System.out.println("�Ѿ�������[" + event.getType() + "]�¼���");
					}
				});
			} catch (Exception e) {
				zooKeeper = null;
				e.printStackTrace();
			}
		} while (zooKeeper == null);
		System.out.println(">>>�������ӳɹ�!");
	}

	/** ���� */
	public static void about() {
		System.out.println("************����" + TOOL_NAME + "****************");
		System.out.println("|���������汾��" + TOOL_VERSION + "����������������������|");
		System.out.println("|�����������ߣ�" + TOOL_AUTHOR + "��������������������|");
		System.out.println("|����������������������������������������|");
		System.out.println("|�汾���£�������������������������������|");
		System.out.println("|V0.1������������������������������������|");
		System.out.println("|����1.��ѯĿ¼��Ϣ���ܡ�����������������|");
		System.out.println("|����2.����Ŀ¼��Ϣ���ܡ�����������������|");
		System.out.println("|����3.�޸�Ŀ¼��Ϣ���ܡ�����������������|");
		System.out.println("|����4.ɾ��Ŀ¼��Ϣ���ܡ�����������������|");
		System.out.println("|����5.����������Ϣ����������������������|");
		System.out.println("|����������������������������������������|");
		System.out.println("|������" + TOOL_COPYRIGHT + "������������|");
		System.out.println("*****************************************");
	}

	/** �˳� */
	public static void exit() {
		System.out.println("ллʹ�ã��ټ���");
		try {
			closeZk();
			Thread.sleep(1000);
		} catch (Exception e) {
		}
		System.exit(0);
	}
	
	private static ZooKeeper openZk() {
		if(zooKeeper==null) {
			// ����һ���������������
			try {
				zooKeeper = new ZooKeeper(zkHost + ":" + zkPort, zkTimeout, new Watcher() {

					// ������б��������¼�
					public void process(WatchedEvent event) {
						System.out.println("�Ѿ�������[" + event.getType() + "]�¼���");
					}
				});
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		
		return zooKeeper;
	}
	
	private static void closeZk() {
		if(zooKeeper!=null) {
			// ����һ���������������
			try {
				zooKeeper.close();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	private static List<ACL> getAcl(String zacl) {
		return Ids.OPEN_ACL_UNSAFE;
	}
	private static CreateMode getCreateMode(String ztype) {
		if("P".equalsIgnoreCase(ztype)) {
			return CreateMode.PERSISTENT;
		} else if("PS".equalsIgnoreCase(ztype)) {
			return CreateMode.PERSISTENT_SEQUENTIAL;
		} else if("E".equalsIgnoreCase(ztype)) {
			return CreateMode.EPHEMERAL;
		} else{
			return CreateMode.EPHEMERAL_SEQUENTIAL;
		}
	}
}
