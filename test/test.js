'use strict';
var assert = require('assert');

var isUri = require('../index');

describe('isUri', function () {

    var fullUriTests = [
        ['foo://example.com:8042/over/there?name=ferret#nose', true],
        ['urn:example:animal:ferret:nose', true],
        ['ftp://ftp.is.co.za/rfc/rfc1808.txt', true],
        ['http://www.ietf.org/rfc/rfc2396.txt', true],
        ['ldap://[2001:db8::7]/c=GB?objectClass?one', true],
        ['ldap://2001:db8::7/c=GB?objectClass?one', false],
        ['mailto:John.Doe@example.com', true],
        ['news:comp.infosystems.www.servers.unix', true],
        ['tel:+1-816-555-1212', true],
        ['telnet://192.0.2.16:80/', true],
        ['urn:oasis:names:specification:docbook:dtd:xml:4.1.2', true],
        ['file:///example.txt', true],
        ['http://asdf:qw%20er@localhost:8000?asdf=12345&asda=fc%2F#bacon', true],
        ['http://asdf@localhost:8000', true],
        ['http://[v1.09azAZ-._~!$&\'()*+,;=:]', true],
        ['http://[a:b:c:d:e::1.2.3.4]', true],
        ['coap://[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]', true],
        ['http://[1080:0:0:0:8:800:200C:417A]', true],
        ['http://v1.09azAZ-._~!$&\'()*+,;=:', true], // This doesn't look valid, but it is. The `v1.09azAZ-._~!$&\'()*+,;=` part is a valid registered name as it has no invalid characters
        ['http://a:b:c:d:e::1.2.3.4', false],
        ['coap://FEDC:BA98:7654:3210:FEDC:BA98:7654:3210', false],
        ['http://1080:0:0:0:8:800:200C:417A', false],
        ['http://127.0.0.1:8000/foo?bar', true],
        ['http://asdf:qwer@localhost:8000', true],
        ['http://user:pass%3A@localhost:80', true],
        ['http://localhost:123', true],
        ['https://localhost:123', true],
        ['file:///whatever', true],
        ['mailto:asdf@asdf.com', true],
        ['ftp://www.example.com', true],
        ['javascript:alert(\'hello\');', true], // eslint-disable-line no-script-url
        ['xmpp:isaacschlueter@jabber.org', true],
        ['f://some.host/path', true],
        ['http://localhost:18/asdf', true],
        ['http://localhost:42/asdf?qwer=zxcv', true],
        ['HTTP://www.example.com/', true],
        ['HTTP://www.example.com', true],
        ['http://www.ExAmPlE.com/', true],
        ['http://user:pw@www.ExAmPlE.com/', true],
        ['http://USER:PW@www.ExAmPlE.com/', true],
        ['http://user@www.example.com/', true],
        ['http://user%3Apw@www.example.com/', true],
        ['http://x.com/path?that%27s#all,%20folks', true],
        ['HTTP://X.COM/Y', true],
        ['http://www.narwhaljs.org/blog/categories?id=news', true],
        ['http://mt0.google.com/vt/lyrs=m@114&hl=en&src=api&x=2&y=2&z=3&s=', true],
        ['http://mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=', true],
        ['http://user:pass@mt0.google.com/vt/lyrs=m@114???&hl=en&src=api&x=2&y=2&z=3&s=', true],
        ['http://_jabber._tcp.google.com:80/test', true],
        ['http://user:pass@_jabber._tcp.google.com:80/test', true],
        ['http://[fe80::1]/a/b?a=b#abc', true],
        ['http://fe80::1/a/b?a=b#abc', false],
        ['http://user:password@[3ffe:2a00:100:7031::1]:8080', true],
        ['coap://[1080:0:0:0:8:800:200C:417A]:61616/', true],
        ['coap://1080:0:0:0:8:800:200C:417A:61616/', false],
        ['git+http://github.com/joyent/node.git', true],
        ['http://bucket_name.s3.amazonaws.com/image.jpg', true],
        ['dot.test://foo/bar', true],
        ['svn+ssh://foo/bar', true],
        ['dash-test://foo/bar', true],
        ['xmpp:isaacschlueter@jabber.org', true],
        ['http://atpass:foo%40bar@127.0.0.1:8080/path?search=foo#bar', true],
        ['javascript:alert(\'hello\');', true], // eslint-disable-line no-script-url
        ['file://localhost/etc/node/', true],
        ['file:///etc/node/', true],
        ['http://USER:PW@www.ExAmPlE.com/', true],
        ['mailto:local1@domain1?query1', true],
        ['http://example/a/b?c/../d', true],
        ['http://example/x%2Fabc', true],
        ['http://a/b/c/d;p=1/g;x=1/y', true],
        ['http://a/b/c/g#s/../x', true],
        ['http://a/b/c/.foo', true],
        ['http://example.com/b//c//d;p?q#blarg', true],
        ['g:h', true],
        ['http://a/b/c/g', true],
        ['http://a/b/c/g/', true],
        ['http://a/g', true],
        ['http://g', true],
        ['http://a/b/c/d;p?y', true],
        ['http://a/b/c/g?y', true],
        ['http://a/b/c/d;p?q#s', true],
        ['http://a/b/c/g#s', true],
        ['http://a/b/c/g?y#s', true],
        ['http://a/b/c/;x', true],
        ['http://a/b/c/g;x', true],
        ['http://a/b/c/g;x?y#s', true],
        ['http://a/b/c/d;p?q', true],
        ['http://a/b/c/', true],
        ['http://a/b/', true],
        ['http://a/b/g', true],
        ['http://a/', true],
        ['http://a/g', true],
        ['http://a/g', true],
        ['file:/asda', true],
        ['qwerty', false],
        ['invalid uri', false],
        ['1http://google.com', false],
        ['http://testdomain`,.<>/?\'";{}][++\\|~!@#$%^&*().org', false],
        ['', false],
        ['(╯°□°)╯︵ ┻━┻', false],
        ['one/two/three?value=abc&value2=123#david-rules', false],
        ['//username:password@test.example.com/one/two/three?value=abc&value2=123#david-rules', false],
        ['http://a\r" \t\n<\'b:b@c\r\nd/e?f', false],
        ['/absolute', false]
    ];

    it('regex validates uris', function () {
        fullUriTests.forEach(function (uri) {
            validateRegex(isUri.uriRegex, uri[0], uri[1]);
        });
    });

    it('isValid()', function () {
        fullUriTests.forEach(function (uri) {
            validateFunction(isUri.isValid, uri[0], uri[1]);
        });
    });

    it('regex with no options validates uris', function () {
        fullUriTests.forEach(function (uri) {
            validateRegex(isUri.createUriRegex(), uri[0], uri[1]);
        });
    });

    it('validates uri with one scheme provided', function () {
        var uris = [
            ['http://google.com', true],
            ['https://google.com', false],
            ['ftp://google.com', false],
            ['file:/asdf', false],
            ['/path?query=value#hash', false]
        ];
        uris.forEach(function (uri) {
            validateRegex(isUri.createUriRegex({
                scheme: 'http'
            }), uri[0], uri[1]);
        });
    });

    it('validates uri with one regex scheme provided', function () {
        var uris = [
            ['http://google.com', true],
            ['https://google.com', true],
            ['ftp://google.com', false],
            ['file:/asdf', false],
            ['/path?query=value#hash', false]
        ];
        uris.forEach(function (uri) {
            validateRegex(isUri.createUriRegex({
                scheme: /https?/
            }), uri[0], uri[1]);
        });
    });

    it('validates uri with multiple mixed schemes provided', function () {
        var uris = [
            ['http://google.com', true],
            ['https://google.com', true],
            ['ftp://google.com', true],
            ['file:/asdf', true],
            ['git+http://github.com/hapijs/joi', true],
            ['/path?query=value#hash', false]
        ];
        uris.forEach(function (uri) {
            validateRegex(isUri.createUriRegex({
                scheme: [/https?/, 'ftp', 'file', 'git+http']
            }), uri[0], uri[1]);
        });
    });

    it('requires options to be an object', function () {
        assert.throws(function () {
            return isUri.createUriRegex([]);
        }, /options must be an object/);
    });

    it('requires scheme to have at least one item', function () {
        assert.throws(function () {
            return isUri.createUriRegex({
                scheme: []
            });
        }, /scheme must have at least 1 scheme specified/);
    });

    it('should error on what looks like a bad scheme', function () {
        assert.throws(function () {
            return isUri.createUriRegex({
                scheme: ['1']
            });
        }, /scheme at position 0 must be a valid scheme/);
    });

    it('requires scheme to be a string or regex', function () {
        assert.throws(function () {
            return isUri.createUriRegex({
                scheme: [1]
            });
        }, /scheme must only contain Regular Expressions or Strings/);
    });
});

function validateRegex(regex, value, expectation) {
    assert.equal(regex.test(value), expectation, 'expected ' + value + ' to be ' + expectation);
}

function validateFunction(func, value, expectation) {
    assert.equal(func(value), expectation, 'expected ' + value + ' to be ' + expectation);
}