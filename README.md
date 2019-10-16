# library-lib

[![Build Status](https://travis-ci.org/e-e-e/library-lib.svg?branch=master)](https://travis-ci.org/e-e-e/library-lib)

A collection of helpful functions for parsing and manipulating library related data.

### Install

```
npm install --save library-lib
```

### Common Usage

##### Convert an isbn10 number to isbn13:

```ts
import { Isbn } from "library-lib";

const isbn10 = '0415389550'

// via Isbn instance
const isbn = Isbn.parse(isbn10)
let isbn13 = isbn.toIsbn13());

// or via static method
isbn13 = Isbn.toIsbn13(isbn10);

```

#### Convert an isbn13 number to isbn10:

```ts
import { Isbn } from "library-lib";

const isbn13 = '978-0-415-38955-6';

// via Isbn instance
const isbn = Isbn.parse(isbn13)
let isbn10 = isbn.toIsbn10());

// or via static method
isbn10 = Isbn.toIsbn10(isbn13);
```
