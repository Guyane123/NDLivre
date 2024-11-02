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
  if (thumbnail) return thumbnail;
  if (smallThumbnail) return smallThumbnail;
  if (small) return small;
  if (medium) return medium;
  if (large) return large;
  if (extraLarge) return extraLarge;

  return '';
}
