(function (should, lib) {
    describe('isuri', function () {
        var validUris = [
                'ftp://ftp.is.co.za/rfc/rfc1808.txt',
                'http://www.ietf.org/rfc/rfc2396.txt',
                'ldap://[2001:db8::7]/c=GB?objectClass?one',
                'mailto:John.Doe@example.com',
                'news:comp.infosystems.www.servers.unix',
                'tel:+1-816-555-1212',
                'telnet://192.0.2.16:80/',
                'urn:oasis:names:specification:docbook:dtd:xml:4.1.2',
                'file:///example.txt',
                'http://asdf:qw%20er@localhost:8000?asdf=12345&asda=fc%2F#bacon',
                'http://asdf@localhost:8000',
                'http://[v1.09azAZ-._~!$&\'()*+,;=:]',
                'http://[a:b:c:d:e::1.2.3.4]',
                'coap://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]',
                'http://[1080:0:0:0:8:800:200C:417A]'
            ],
            invalidUris = [
                'file:/asda'
            ];
        it('should be instantiated', function () {
            lib.should.be.ok;
        });
        it('should have the test function', function () {
            lib.test.should.be.a.function;
        });

        describe('Validity Tests', function () {
            validUris.forEach(function (uri) {
                it('should consider ' + uri + ' valid', function () {
                    lib.test(uri).should.be.true;
                });
            });
        });

        describe('Invalidity Tests', function () {
            invalidUris.forEach(function (uri) {
                it('should consider ' + uri + ' invalid', function () {
                    lib.test(uri).should.be.false;
                });
            });
        });
    });
}(require('should'), require('../')));