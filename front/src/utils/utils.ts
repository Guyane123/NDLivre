import { googleApiBook } from '../types';

export async function fetchData(link: string) {
  try {
    const res = await (await fetch(link)).json();
    if (!res) return;
    return res;
  } catch (err) {
    console.error(err);
    return;
  }
}

export function getBookThumbnail(book: googleApiBook) {
  const { smallThumbnail, thumbnail, small, extraLarge, large, medium } =
    book.volumeInfo.imageLinks;
  let choice: string = '';
  if (thumbnail) choice = thumbnail;
  if (smallThumbnail) choice = smallThumbnail;
  if (small) choice = small;
  if (medium) choice = medium;
  if (large) choice = large;
  if (extraLarge) choice = extraLarge;

  return choice;
}
