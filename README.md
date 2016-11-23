multiplayernow
==============

[![Build Status][travis-image]][travis-url]
[![Test Coverage][coveralls-image]][coveralls-url]

**Live Website**: https://multiplayernow.com

This is a small example app, nothing fancy. Complete production app with minimal dependencies, no client-side js (except AMP).

Built with:

- Express
- MongoDB (requires MongoDB 3.2)
- [AMP](https://ampproject.org/)
- Node.js

Features
--------

- Filter games by tag
- Post comments

Getting started
---------------
  
Clone the repo and run:

```bash
npm install
npm run build
npm run start
```

To watch for changes, you can use:

```bash
npm run watch
npm run watch:css
```

Tests
-----

```bash
npm test
```

Configuration
-------------

Edit [config.json](./config/config.json)

License
-------

The MIT License (MIT)

Copyright (c) 2015-2016 Matthias Klein

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

[travis-image]: https://travis-ci.org/matkl/multiplayernow.svg?branch=master
[travis-url]: https://travis-ci.org/matkl/multiplayernow
[coveralls-image]: https://img.shields.io/coveralls/matkl/multiplayernow/master.svg
[coveralls-url]: https://coveralls.io/r/matkl/multiplayernow?branch=master
