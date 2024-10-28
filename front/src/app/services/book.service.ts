import { Injectable } from '@angular/core';
import { book, extendedBook } from '../../types';
var regExp = /[a-zA-Z]/g;

@Injectable({
  providedIn: 'root',
})
export class bookService {
  async getBook(identifier: string): Promise<extendedBook> {
    let apiURL = identifier;
    if (regExp.test(identifier)) {
      apiURL = 'https://www.googleapis.com/books/v1/volumes/' + identifier;
    } else {
      apiURL =
        'https://www.googleapis.com/books/v1/volumes?q=isbn:' + identifier;
    }

    const {
      volumeInfo: {
        title,
        authors,
        publishedDate,
        industryIdentifiers,
        description,
        publisher,
        categories,
        pageCount,
        imageLinks,
      },
    } = await (await fetch(apiURL)).json();

    const book = {
      title,
      authors,
      publisher: publisher,
      date: publishedDate,
      ISBN: industryIdentifiers,
      categories: categories,
      desc: description,
      pages: pageCount,
      imageLinks,
    };
    return book;
  }
}
