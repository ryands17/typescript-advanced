import { prettyPrint } from './functions.js';

class Books {
  constructor(public titles: string[] = []) {}
}

const myBooks = new Books();
myBooks.titles = [
  'Game of Thrones: A Clash of Kings',
  'Lord of the Rings',
  'Harry Potter',
  'Game of Thrones: A Song of Ice and Fire',
];

// "strictPropertyInitialization": true in tsconfig gives us strict checking for undefined or null
const gotTitles = myBooks.titles.filter((title) =>
  title.startsWith('Game of Thrones')
);
console.log(prettyPrint(gotTitles));
