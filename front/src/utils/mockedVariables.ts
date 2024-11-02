import { article, book, user } from '../types';

//export const mockedBook: book = {};

const ISBN = [
  { type: 'ISBN_10', identifier: '2228917400' },
  { type: 'ISBN_13', identifier: '9782228917407' },
];



export class mockedArticleClass {
  id;
  bookId;
  isVisible = true;
  date = new Date();
  comments = [];
  likes = [];
  desc = '';
  user = mockedUser;

  constructor(id: string, bookId: string) {
    this.id = id;
    this.bookId = bookId;
  }
}

export const mockedArticle: article = new mockedArticleClass(
  '1',
  'fi3dDQAAQBAJ'
);

export const mockedArticles = [
  mockedArticle,
  new mockedArticleClass('2', 'f9Q3DwAAQBAJ'),
  new mockedArticleClass('3', 'YJMvEAAAQBAJ'),
  new mockedArticleClass('4', 'CjugDwAAQBAJ'),
  new mockedArticleClass('5', 'Z2SN_OPhG7UC'),
];

export function findArticle(id: string): Promise<article | undefined> {
  return Promise.resolve(mockedArticles.find((a) => a.id == id));
}
export const mockedUser: Omit<user, 'password'> = {
  EDId: '1378',
  authType: 'ED',
  type: 'user',
  books: mockedArticles,
  pseudonym: 'John Doe',
  image: 'https://thispersondoesnotexist.com',
  email: 'johndoe@exemple.com',
  loans: [],
  history: [],
  comments: [],
};
