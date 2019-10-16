export class Isbn {
  private isbn: string;
  // private checksum: string;
  EAN: string;
  group: string;
  publisher: string;
  title: string;
  isIsbn10: boolean;
  isIsbn13: boolean;

  constructor(rawIsbn: string) {
    const isbn = rawIsbn.replace(/[\s-]/g, '').toUpperCase();
    this.isIsbn13 = !!isbn.match(/^97(8|9)\d{10}$/);
    this.isIsbn10 = !!isbn.match(/^\d{9}(\d|X)$/);
    if (!this.isIsbn10 && !this.isIsbn13) {
      throw new Error('Invalid Isbn');
    }
    this.EAN = this.isIsbn13 ? isbn.slice(0, 3) : '978';
    const common = isbn.slice(this.isIsbn13 ? 3 : 0, -1);
    this.group = common.slice(0, 2);
    this.publisher = common.slice(2, 6);
    this.title = common.slice(6);
    this.isbn = isbn;
  }

  private checkIsbn10(isbn: string) {
    let s = 0;
    let t = 0;
    for (let i = 0; i < 10; i++) {
      t += isbn[i] === 'X' ? 10 : parseInt(isbn[i], 10);
      s += t;
    }
    return s % 11;
  }

  private checkIsbn13(isbn: string) {
    let s = 0;
    for (let i = 0; i < 13; i++) {
      s += parseInt(isbn[i], 10) * (i % 2 === 0 ? 1 : 3);
    }
    return s % 10;
  }

  /**
   * Check if isbn checkDigit is valid.
   */
  validate(): boolean {
    if (this.isIsbn10) {
      return this.checkIsbn10(this.isbn) === 0;
    }
    return this.checkIsbn13(this.isbn) === 0;
  }

  /**
   * Return ISBN formated as ISBN10
   */
  toIsbn10(): string {
    const core = this.group + this.publisher + this.title;
    const remainder = this.checkIsbn10(core + '0');
    const checkDigit = (11 - remainder) % 11;
    return core + (checkDigit === 10 ? 'X' : checkDigit);
  }

  /**
   * Return ISBN formated as ISBN13
   */
  toIsbn13(): string {
    const core = this.EAN + this.group + this.publisher + this.title;
    const remainder = this.checkIsbn13(core + '0');
    return core + ((10 - remainder) % 10);
  }

  /**
   * Check if string is a valid ISBN.
   */
  static validate(rawIsbn: string): boolean {
    let isbn;
    try {
      isbn = Isbn.parse(rawIsbn);
    } catch (e) {
      return false;
    }
    return isbn.validate();
  }

  /**
   * Parse number into instance of Isbn class.
   */
  static parse(isbn: string): Isbn {
    return new Isbn(isbn);
  }

  /**
   * Convert ISBN to ISBN10
   */
  static toIsbn10(isbn: string): string {
    return Isbn.parse(isbn).toIsbn10();
  }

  /**
   * Convert ISBN to ISBN13
   */
  static toIsbn13(isbn: string): string {
    return Isbn.parse(isbn).toIsbn13();
  }
}
