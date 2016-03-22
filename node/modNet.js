 // ģ���ṩ��һЩ���ڵײ������ͨ�ŵ�С���ߣ������˴���������/�ͻ��˵ķ�����

// 1	net.createServer([options][, connectionListener])
// ����һ�� TCP ������������ connectionListener �Զ��� 'connection' �¼�������������
// 2	net.connect(options[, connectionListener])
// ����һ���µ� 'net.Socket'�������ӵ�ָ���ĵ�ַ�Ͷ˿ڡ�
// �� socket ������ʱ�򣬽��ᴥ�� 'connect' �¼���
// 3	net.createConnection(options[, connectionListener])
// ����һ�����˿� port �� ���� host�� TCP ���ӡ� host Ĭ��Ϊ 'localhost'��
// 4	net.connect(port[, host][, connectListener])
// ����һ���˿�Ϊ port ������Ϊ host�� TCP ���� ��host Ĭ��Ϊ 'localhost'������ connectListener ������Ϊ��������ӵ� 'connect' �¼������� 'net.Socket'��
// 5	net.createConnection(port[, host][, connectListener])
// ����һ���˿�Ϊ port ������Ϊ host�� TCP ���� ��host Ĭ��Ϊ 'localhost'������ connectListener ������Ϊ��������ӵ� 'connect' �¼������� 'net.Socket'��
// 6	net.connect(path[, connectListener])
// �������ӵ� path �� unix socket ������ connectListener ������Ϊ��������ӵ� 'connect' �¼��ϡ����� 'net.Socket'��
// 7	net.createConnection(path[, connectListener])
// �������ӵ� path �� unix socket ������ connectListener ������Ϊ��������ӵ� 'connect' �¼������� 'net.Socket'��
// 8	net.isIP(input)
// ���������Ƿ�Ϊ IP ��ַ�� IPV4 ���� 4�� IPV6 ���� 6������������� 0��
// 9	net.isIPv4(input)
// �������ĵ�ַΪ IPV4�� ���� true�����򷵻� false��
// 10	net.isIPv6(input)
// �������ĵ�ַΪ IPV6�� ���� true�����򷵻� false��

var path = require("path");
console.log(path.join('dir1','file.txt'));


// net.Server
// net.Serverͨ�����ڴ���һ�� TCP �򱾵ط�������
// 1	server.listen(port[, host][, backlog][, callback])
// ����ָ���˿� port �� ���� host ac���ӡ� Ĭ������� host �����κ� IPv4 ��ַ(INADDR_ANY)��ֱ�����ӡ��˿� port Ϊ 0 ʱ��������һ������˿ڡ�
// 2	server.listen(path[, callback])
// ͨ��ָ�� path �����ӣ�����һ������ socket ��������
// 3	server.listen(handle[, callback])
// ͨ��ָ��������ӡ�
// 4	server.listen(options[, callback])
// options �����ԣ��˿� port, ���� host, �� backlog, �Լ���ѡ���� callback ����, ������һ�����server.listen(port, [host], [backlog], [callback])�����У����� path ��������ָ�� UNIX socket��
// 5	server.close([callback])
// ������ֹͣ�����µ����ӣ������������ӡ������첽���������������ӽ�����ʱ���������رգ����ᴥ�� 'close' �¼���
// 6	server.address()
// ����ϵͳ���ذ󶨵ĵ�ַ��Э�������ͷ������˿ڡ�
// 7	server.unref()
// ��������¼�ϵͳ��Ψһһ����ķ����������� unref ����������˳���
// 8	server.ref()
// �� unref �෴���������Ψһ�ķ���������֮ǰ�� unref �˵ķ������ϵ��� ref �������ó����˳���Ĭ����Ϊ��������������Ѿ��� ref�����ٴε��� ref ���������Ӱ�졣
// 9	server.getConnections(callback)
// �첽��ȡ��������ǰ��Ծ���ӵ��������� socket ���͸��ӽ��̺����Ч���ص������� 2 ������ err �� count
	// �¼�
	// 1	listening
	// ������������ server.listen �󶨺�ᴥ����
	// 2	connection
	// �������Ӵ�����ᱻ������socket �� net.Socketʵ����
	// 3	close
	// �������ر�ʱ�ᴥ����ע�⣬����������ӣ�����¼����ᱻ����ֱ�����е����ӹرա�
	// 4	error
	// ��������ʱ������'close' �¼����������¼�ֱ�ӵ���


// net.Socket
// net.Socket ������ TCP �� UNIX Socket �ĳ���net.Socket ʵ��ʵ����һ��˫�����ӿڡ� ���ǿ������û������ͻ���(ʹ�� connect())ʱʹ��, ������ Node �������ǣ���ͨ�� connection �������¼����ݸ��û���
// lookup
// �ڽ��������󣬵�������ǰ����������¼����� UNIX sokcet �����á�
// 2	connect
// �ɹ����� socket ����ʱ������
// 3	data
// �����յ�����ʱ������
// 4	end
// �� socket ��һ�˷��� FIN ��ʱ���������¼���
// 5	timeout
// �� socket ���г�ʱʱ���������Ǳ��� socket �Ѿ����С��û������ֶ��ر����ӡ�
// 6	drain
// ��д����Ϊ�յ�ʱ�򴥷��������������ϴ���
// 7	error
// ������ʱ������
// 8	close
// �� socket ��ȫ�ر�ʱ���������� had_error �ǲ���ֵ������ʾ�Ƿ���Ϊ��������� socket �رա�

// ����
// 1	socket.bufferSize
// ��������ʾ��Ҫд�뻺�������ֽ�����
// 2	socket.remoteAddress
// Զ�̵� IP ��ַ�ַ��������磺'74.125.127.100' or '2001:4860:a005::68'��
// 3	socket.remoteFamily
// Զ��IPЭ�����ַ��������� 'IPv4' or 'IPv6'��
// 4	socket.remotePort
// Զ�̶˿ڣ����ֱ�ʾ�����磺80 or 21��
// 5	socket.localAddress
// �������Ӱ󶨵ı��ؽӿ� Զ�̿ͻ����������ӵı��� IP ��ַ���ַ�����ʾ�����磬������ڼ���'0.0.0.0'���ͻ���������'192.168.1.1'�����ֵ�ͻ��� '192.168.1.1'��
// 6	socket.localPort
// ���ض˿ڵ�ַ�����ֱ�ʾ�����磺80 or 21��
// 7	socket.bytesRead
// ���յ����ֽ�����
// 8	socket.bytesWritten
// ���͵��ֽ�����

// ����
// 1	new net.Socket([options])
// ����һ���µ� socket ����
// 2	socket.connect(port[, host][, connectListener])
// ָ���˿� port �� ���� host������ socket ���� ������ host Ĭ��Ϊ localhost��ͨ���������Ҫʹ�� net.createConnection �� socket��ֻ����ʵ�����Լ��� socket ʱ�Ż��õ���
// 3	socket.connect(path[, connectListener])
// ��ָ��·���� unix socket��ͨ���������Ҫʹ�� net.createConnection �� socket��ֻ����ʵ�����Լ��� socket ʱ�Ż��õ���
// 4	socket.setEncoding([encoding])
// ���ñ���
// 5	socket.write(data[, encoding][, callback])
// �� socket �Ϸ������ݡ��ڶ�������ָ�����ַ����ı��룬Ĭ���� UTF8 ���롣
// 6	socket.end([data][, encoding])
// ��ر� socket�����磬������һ�� FIN �������ܷ��������ڷ������ݡ�
// 7	socket.destroy()
// ȷ��û�� I/O �������׽����ϡ�ֻ���ڴ���������²���Ҫ�����������ȵȣ���
// 8	socket.pause()
// ��ͣ��ȡ���ݡ�����˵�������ٴ��� data �¼������ڿ����ϴ��ǳ����á�
// 9	socket.resume()
// ���� pause() ����ָ���ȡ���ݡ�
// 10	socket.setTimeout(timeout[, callback])
// socket ����ʱ�䳬�� timeout ����� ���� socket ����Ϊ��ʱ��
// 11	socket.setNoDelay([noDelay])
// �����ɸ�Nagle���㷨��Ĭ������� TCP ����ʹ���ɸ��㷨���ڷ���ǰ���ǻỺ�����ݡ��� noDelay ����Ϊ true �����ڵ��� socket.write() ʱ�����������ݡ�noDelay Ĭ��ֵΪ true��
// 12	socket.setKeepAlive([enable][, initialDelay])
// ����/���ó����ӹ��ܣ����ڷ��͵�һ�������� socket �ϵĳ����� probe ֮ǰ����ѡ���趨��ʼ��ʱ��Ĭ��Ϊ false�� �趨 initialDelay �����룩�����趨�յ������һ�����ݰ��͵�һ��������probe֮�����ʱ���� initialDelay ��Ϊ0�����ᱣ��Ĭ�ϣ�����֮ǰ����ֵ��Ĭ��ֵΪ0.
// 13	socket.address()
// ����ϵͳ���ذ󶨵ĵ�ַ��Э�������ͷ������˿ڡ����صĶ����� 3 �����ԣ�����{ port: 12346, family: 'IPv4', address: '127.0.0.1' }��
// 14	socket.unref()
// ��������¼�ϵͳ��Ψһһ����ķ����������� unref ����������˳�������������ѱ� unref�����ٴε��� unref ���������Ӱ�졣
// 15	socket.ref()
// �� unref �෴���������Ψһ�ķ���������֮ǰ�� unref �˵ķ������ϵ��� ref �������ó����˳���Ĭ����Ϊ��������������Ѿ��� ref�����ٴε��� ref ���������Ӱ�졣


