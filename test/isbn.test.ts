import { Isbn } from "../src/index";

const isbn10 = "0415389550";
const formatedIsbn10 = "0-415-38955-0";
const isbn13 = "9780415389556";
const formatedIsbn13 = "978-0-415-38955-6";

describe("Isbn", () => {
  describe("validate", () => {
    it.each([isbn10, formatedIsbn10, isbn13, formatedIsbn13])(
      "%s is a valid ISBN",
      isbn => {
        expect(Isbn.validate(isbn)).toBeTruthy();
      }
    );

    it.each([
      "",
      "noop",
      isbn10.slice(0, -1) + "X",
      formatedIsbn10.slice(0, -1) + "2",
      isbn13.slice(0, -1) + "X",
      formatedIsbn13.slice(0, -1) + "2"
    ])("%s is not a valid ISBN", isbn => {
      expect(Isbn.validate(isbn)).toEqual(false);
    });
  });

  describe("toIsbn10", () => {
    it("converts an isbn 13 to isbn 10", () => {
      expect(Isbn.toIsbn10(isbn13)).toEqual(isbn10);
      expect(Isbn.toIsbn10(formatedIsbn13)).toEqual(isbn10);
    });
  });

  describe("toIsbn13", () => {
    it("converts an isbn 10 to isbn 13", () => {
      expect(Isbn.toIsbn13(isbn10)).toEqual(isbn13);
      expect(Isbn.toIsbn13(formatedIsbn10)).toEqual(isbn13);
    });
  });
});
