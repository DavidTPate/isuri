isuri
=====
[![NPM version](https://badge.fury.io/js/isuri.svg)](http://badge.fury.io/js/isuri)
[![Build Status](https://travis-ci.org/DavidTPate/isuri.svg?branch=master)](https://travis-ci.org/DavidTPate/isuri)
[![Coverage Status](https://img.shields.io/coveralls/DavidTPate/isuri.svg?branch=master)](https://coveralls.io/r/DavidTPate/isuri)

Pure Javascript implementation for truly checking if the provided input is an URI. Based on RFC 3986

## Install

#### NPM
```bash
$ npm install isuri
```

## Node.js
```js
var isuri = require('isuri');
function isUri(str) {
    return isuri(str);
}
});
```

## License

  [MIT](LICENSE)