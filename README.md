isUri
=====
[![NPM version](https://badge.fury.io/js/isuri.svg)](http://badge.fury.io/js/isuri)
[![Build Status](https://travis-ci.org/DavidTPate/isuri.svg?branch=master)](https://travis-ci.org/DavidTPate/isuri)
[![Code Climate](https://codeclimate.com/github/DavidTPate/isuri/badges/gpa.svg)](https://codeclimate.com/github/DavidTPate/isuri)
[![Test Coverage](https://codeclimate.com/github/DavidTPate/isuri/badges/coverage.svg)](https://codeclimate.com/github/DavidTPate/isuri)

Pure Javascript implementation for truly checking if the provided input is an URI. Compliant with [RFC 3986](http://tools.ietf.org/html/rfc3986) and documented!

## Install

#### NPM
```bash
$ npm install isuri
```

## Node.js
```js
var isUri = require('isuri');

isUri.test('http://example.com'); // returns true
isUri.test('Bananas in pajamas are coming down the stairs'); // returns false
```

## Benchmarks
``` bash
> Benchmarking complex-ipv4.js

  Testing URI "http://asdf:qw%20er@127.0.0.1:8000?asdf=12345&asda=fc%2F#bacon"

  isUri#test(uri) x 1,916,525 ops/sec ±0.22% (196 runs sampled)

> Benchmarking complex-ipv6.js

  Testing URI "http://asdf:qw%20er@[FEDC:BA98:7654:3210:FEDC:BA98:7654:3210]:8000?asdf=12345&asda=fc%2F#bacon"

  isUri#test(uri) x 1,367,745 ops/sec ±0.18% (196 runs sampled)

> Benchmarking complex-ipvFuture.js

  Testing URI "http://asdf:qw%20er@[v1.09azAZ-._~!$&'()*+,;=:]:8000?asdf=12345&asda=fc%2F#bacon"

  isUri#test(uri) x 1,485,227 ops/sec ±0.19% (195 runs sampled)

> Benchmarking complex-uri.js

  Testing URI "http://asdf:qw%20er@localhost:8000?asdf=12345&asda=fc%2F#bacon"

  isUri#test(uri) x 2,100,513 ops/sec ±0.18% (197 runs sampled)

> Benchmarking simple-uri.js

  Testing URI "mailto:John.Doe@example.com"

  isUri#test(uri) x 2,314,868 ops/sec ±0.19% (195 runs sampled)
```

## License

  [MIT](LICENSE)