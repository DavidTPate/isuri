isUri
=====
[![NPM version](https://badge.fury.io/js/isuri.svg)](http://badge.fury.io/js/isuri)
[![Build Status](https://travis-ci.org/DavidTPate/isuri.svg?branch=master)](https://travis-ci.org/DavidTPate/isuri)
[![Code Climate](https://codeclimate.com/github/DavidTPate/isuri/badges/gpa.svg)](https://codeclimate.com/github/DavidTPate/isuri)
[![Coverage Status](https://img.shields.io/coveralls/DavidTPate/isuri.svg?branch=master)](https://coveralls.io/r/DavidTPate/isuri)

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

## License

  [MIT](LICENSE)