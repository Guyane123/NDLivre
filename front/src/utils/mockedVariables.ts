import { article, book, user } from '../types';

//export const mockedBook: book = {};

const ISBN = [
  { type: 'ISBN_10', identifier: '2228917400' },
  { type: 'ISBN_13', identifier: '9782228917407' },
];

export const mockedUser: Omit<user, 'password'> = {
  EDId: '1378',
  authType: 'ED',
  type: 'user',
  books: [],
  pseudonym: 'John Doe',
  image: 'https://thispersondoesnotexist.com',
  email: 'johndoe@exemple.com',
  loans: [],
  history: [],
  comments: [],
};

export const mockedArticle: article = {
  id: '1',
  bookId: 'fi3dDQAAQBAJ',
  isVisible: true,
  date: new Date(),
  comments: [],
  likes: [],
  desc: '',
  user: mockedUser,
};
const articles = [mockedArticle];

export function findArticle(id: string): Promise<article | undefined> {
  return Promise.resolve(articles.find((a) => a.id == id));
}
