import { Injectable } from '@angular/core';
import {googleApiBook} from "../../../types";
import {getBookThumbnail} from "../../../utils/utils";
import {Book} from "../../components/books/books.component";

@Injectable({
  providedIn: 'root',
})
export class UserService {


  async sendBooks(books: Array<googleApiBook>, userToken: string) {
  const bookSent: Array<Book> = []
  for (const book of books) {
    const formattedBook = {
      gId : book.id,
      image : getBookThumbnail(book),
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      views : [],
      likes: [],
      comments: [],
      isVisible: true
    }
    const res = await fetch("https://localhost:3000/book",  {method: "POST",       headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${userToken}`

      },body: JSON.stringify(formattedBook)})
    const data = await res.json();
    bookSent.push(data);
  }

  return bookSent;

  }

}
