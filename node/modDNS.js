// Node.js DNS ģ�����ڽ�������
// var dns = require("dns")

// 1	dns.lookup(hostname[, options], callback)
// ������������ 'runoob.com'������Ϊ��һ���ҵ��ļ�¼ A ��IPV4���� AAAA(IPV6)������ options������һ����������������û���ṩ options��IP v4 �� v6 ��ַ�����ԡ���� options ��������������� 4 �� 6��
// 2	dns.lookupService(address, port, callback)
// ʹ�� getnameinfo ��������ĵ�ַ�Ͷ˿�Ϊ�����ͷ���
// 3	dns.resolve(hostname[, rrtype], callback)
// ��һ���������� 'runoob.com'������Ϊһ�� rrtype ָ����¼���͵����顣
// 4	dns.resolve4(hostname, callback)
// �� dns.resolve() ����, ���ܲ�ѯ IPv4 (A ��¼���� addresses IPv4 ��ַ���� (���磬['74.125.79.104', '74.125.79.105', '74.125.79.106']����
// 5	dns.resolve6(hostname, callback)
// �� dns.resolve4() ���ƣ� ���ܲ�ѯ IPv6( AAAA ��ѯ��
// 6	dns.resolveMx(hostname, callback)
// �� dns.resolve() ����, ���ܲ�ѯ�ʼ�����(MX ��¼)��
// 7	dns.resolveTxt(hostname, callback)
// �� dns.resolve() ����, ���ܽ����ı���ѯ (TXT ��¼���� addresses �� 2-d �ı���¼���顣(���磬[ ['v=spf1 ip4:0.0.0.0 ', '~all' ] ]���� ÿ�����������һ����¼�� TXT �顣����ʹ���������������һ��Ҳ�ɵ���ʹ�á�
// 8	dns.resolveSrv(hostname, callback)
// �� dns.resolve() ����, ���ܽ��з����¼��ѯ (SRV ��¼���� addresses �� hostname���õ� SRV ��¼���顣 SRV ��¼���������ȼ���priority����Ȩ�أ�weight��, �˿ڣ�port��, �����֣�name�� (���磬[{'priority': 10, 'weight': 5, 'port': 21223, 'name': 'service.example.com'}, ...]����
// 9	dns.resolveSoa(hostname, callback)
// �� dns.resolve() ����, ���ܲ�ѯȨ����¼(SOA ��¼����
// 10	dns.resolveNs(hostname, callback)
// �� dns.resolve() ����, ���ܽ���������������¼��ѯ(NS ��¼���� addresses ��������������¼���飨hostname ����ʹ�ã� (����, ['ns1.example.com', 'ns2.example.com']����
// 11	dns.resolveCname(hostname, callback)
// �� dns.resolve() ����, ���ܽ��б�����¼��ѯ (CNAME��¼)��addresses �Ƕ� hostname ���õı�����¼���� (���磬, ['bar.example.com']����
// 12	dns.reverse(ip, callback)
// ������� IP ��ַ��ָ��� IP ��ַ���������顣
// 13	dns.getServers()
// ����һ�����ڵ�ǰ������ IP ��ַ������ַ�����
// 14	dns.setServers(servers)
// ָ��һ�� IP ��ַ��Ϊ������������

//rrtypes
// 'A' IPV4 ��ַ, Ĭ��
// 'AAAA' IPV6 ��ַ
// 'MX' �ʼ�������¼
// 'TXT' text ��¼
// 'SRV' SRV ��¼
// 'PTR' �������� IP ����
// 'NS' ������������¼
// 'CNAME' ������¼
// 'SOA' ��Ȩ��¼�ĳ�ʼֵ

// ERROR CODE
// dns.NODATA: ��������Ӧ��
// dns.FORMERR: ��ѯ��ʽ����
// dns.SERVFAIL: ����ʧ�ܡ�
// dns.NOTFOUND: û���ҵ�������
// dns.NOTIMP: δʵ������Ĳ�����
// dns.REFUSED: �ܾ���ѯ��
// dns.BADQUERY: ��ѯ��ʽ����
// dns.BADNAME: ������ʽ����
// dns.BADFAMILY: ��ַЭ�鲻֧�֡�
// dns.BADRESP: �ظ���ʽ����
// dns.CONNREFUSED: �޷����ӵ� DNS ��������
// dns.TIMEOUT: ���� DNS ��������ʱ��
// dns.EOF: �ļ�ĩ�ˡ�
// dns.FILE: ���ļ�����
// dns.NOMEM: �ڴ������
// dns.DESTRUCTION: ͨ�����ݻ١�
// dns.BADSTR: �ַ�����ʽ����
// dns.BADFLAGS: �Ƿ���ʶ����
// dns.NONAME: ���������������֡�
// dns.BADHINTS: �Ƿ�HINTS��ʶ����
// dns.NOTINITIALIZED: c c-ares ����δ��ʼ����
// dns.LOADIPHLPAPI: ���� iphlpapi.dll ����
// dns.ADDRGETNETWORKPARAMS: �޷��ҵ� GetNetworkParams ������
// dns.CANCELLED: ȡ�� DNS ��ѯ��



var dns = require('dns');

dns.lookup('www.github.com', function onLookup(err, address, family) {
   console.log('ip ADDR:', address);

   dns.reverse(address, function (err, hostnames) {
   	if (err) {
      	console.log(err.stack);
   	}
   console.log('HOST:' + address + ': ' + JSON.stringify(hostnames));
});  
});