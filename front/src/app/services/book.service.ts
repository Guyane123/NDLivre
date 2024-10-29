import { Injectable } from '@angular/core';
import { book } from '../../types';
var regExp = /[a-zA-Z]/g;

@Injectable({
  providedIn: 'root',
})
export class BookService {
  async getBook(identifier: string): Promise<book> {
    let apiURL = identifier;
    if (regExp.test(identifier)) {
      apiURL = 'https://www.googleapis.com/books/v1/volumes/' + identifier;
    } else {
      apiURL =
        'https://www.googleapis.com/books/v1/volumes?q=isbn:' + identifier;
    }

    const {
      id,
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
      desc: description.replace('<p>', '').replace('</p>', ''),
      pages: pageCount,
      imageLinks,
      id,
    };
    return book;
  }
}
