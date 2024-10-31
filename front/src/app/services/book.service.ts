import { Injectable } from '@angular/core';
import { book, googleApiBook, shelf } from '../../types';
var regExp = /[a-zA-Z]/g;

class User {
  id: string | undefined;
  books: Array<book> | [] = [];
  token: string | undefined;

  async setId(accesToken: string): Promise<string> {
    // const redirectLink = `https://accounts.google.com/o/oauth2/auth?client_id=${"process.env['CLIENT_ID']"}&redirect_uri=${redirect}&response_type=token&scope=https://www.googleapis.com/auth/books`;

    const googleLivreSession = sessionStorage.getItem('GoogleLivre');
    if (googleLivreSession !== null) {
      const { token, id } = JSON.parse(googleLivreSession);
      this.id = id;
      this.token = token;

      return id;
    }

    const res: { items: Array<shelf> } = await (
      await fetch('https://www.googleapis.com/books/v1/mylibrary/bookshelves', {
        headers: { Authorization: `${accesToken}` },
      })
    ).json();

    this.token = accesToken;
    const firstShelfLink = res.items[0].selfLink;

    const userId = firstShelfLink.replace('https://', '').split('/')[5]; // "https://www.googleapis.com/books/v1/users/1112223334445556677/bookshelves/3" -> www.googleapis.com/books/v1/users/1112223334445556677/bookshelves/3 -> [www.googleapis.com, books, v1, users, 1112223334445556677, bookshelves, 3] -> 1112223334445556677
    this.id = userId;

    sessionStorage.setItem(
      'GoogleLivre',
      JSON.stringify({ userId: this.id, token: accesToken })
    );
    return userId;
  }

  async getShelfBooks(shelfId: number) {
    const res: { items: Array<book> } = await (
      await fetch(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/volumes`,
        {
          headers: { Authorization: `${this.token}` },
        }
      )
    ).json();

    return { items: res.items, shelfId };
  }

  async getShelfs(): Promise<Array<shelf>> {
    const shelfs = await (
      await fetch(`https://www.googleapis.com/books/v1/mylibrary/bookshelves`, {
        headers: { Authorization: `${this.token}` },
      })
    ).json();
    return shelfs;
  }

  async getShelf(shelfId: number): Promise<shelf> {
    const shelf: shelf = await (
      await fetch(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/`,
        {
          headers: { Authorization: `${this.token}` },
        }
      )
    ).json();
    return shelf;
  }

  async addBooks(
    booksIds: Array<string>,
    shelfId: number
  ): Promise<Array<string>> {
    booksIds.forEach(async (element: string) => {
      await fetch(
        `https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/addVolume?volumeId=${element}key=yourAPIKey`,
        {
          headers: { Authorization: `${this.token}` },
        }
      );
    });

    return booksIds;
  }

  async removeBooks(
    booksIds: Array<string>,
    shelfId: number
  ): Promise<Array<string>> {
    booksIds.forEach(async (element: string) => {
      await fetch(
        `    https://www.googleapis.com/books/v1/mylibrary/bookshelves/${shelfId}/removeVolume?volumeId=${element}=yourAPIKey`,
        {
          headers: { Authorization: `${this.token}` },
        }
      );
    });

    return booksIds;
  }
}
const user = new User();
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

  async getUserShelfs(): Promise<Array<shelf>> {
    return await user.getShelfs();
  }

  async getUserShelf(shelfId: number): Promise<shelf> {
    return await user.getShelf(shelfId);
  }

  async getUserShelfBooks(shelfId: number) {
    return await user.getShelfBooks(shelfId);
  }

  async addUserShelfBooks(shelfId: number, booksIds: Array<string>) {
    return await user.addBooks(booksIds, shelfId);
  }

  async removeUserShelfBooks(shelfId: number, booksIds: Array<string>) {
    return await user.removeBooks(booksIds, shelfId);
  }

  async getShelfs(userId: string) {
    const shelfs = await (
      await fetch(
        `https://www.googleapis.com/books/v1/users/${userId}/bookshelves`
      )
    ).json();

    return shelfs;
  }

  async getShelf(userId: string, shelfId: number) {
    const shelf = await (
      await fetch(
        `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelfId}`
      )
    ).json();

    return shelf;
  }

  async getShelfBooks(userId: string, shelfId: number) {
    const books = await (
      await fetch(
        `https://www.googleapis.com/books/v1/users/${userId}/bookshelves/${shelfId}/volumes`
      )
    ).json();

    return books;
  }
}
