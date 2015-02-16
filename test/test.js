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
                'http://[1080:0:0:0:8:800:200C:417A]',
                'http://127.0.0.1:8000/foo?bar',
                'http://asdf:qwer@localhost:8000',
                'http://user:pass%3A@localhost:80',
                'http://localhost:123',
                'https://localhost:123',
                'file:///whatever',
                'mailto:asdf@asdf.com',
                'ftp://www.example.com',
                'javascript:alert(\'hello\');',
                'xmpp:isaacschlueter@jabber.org',
                'f://some.host/path',
                'http://localhost:18/asdf',
                'http://localhost:42/asdf?qwer=zxcv',
                'HTTP://www.example.com/',
                'HTTP://www.example.com',
                'http://www.ExAmPlE.com/',
                'http://user:pw@www.ExAmPlE.com/',
                'http://USER:PW@www.ExAmPlE.com/',
                'http://user@www.example.com/',
                'http://user%3Apw@www.example.com/',
                'http://x.com/path?that%27s#all,%20folks',
                'HTTP://X.COM/Y',
                'http://www.narwhaljs.org/blog/categories?id=news',
                'http://mt0.google.com/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=',
                'http://mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s='
            ],
            invalidUris = [
                'file:/asda',
                'qwerty'
            ];
        it('should be instantiated', function () {
            lib.should.be.ok;
        });
        it('should have the test property', function () {
            lib.test.should.be.a.function;
        });
        it('should have the regex property', function () {
            lib.regex.should.be.an.object;
        });
        it('should be able to use the regex', function() {
           var matches =  lib.regex.exec('http://asdf:qw%20er@localhost:8000?asdf=12345&asda=fc%2F#bacon');
            matches.should.be.ok;
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