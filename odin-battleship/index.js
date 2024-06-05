import './index.css';

import { Ship } from './ship';

console.log('Hello from Odin Battleship!');

const carrier = Ship(5);
console.log(
  'This is a Carrier Ship: ',
  carrier,
  `\nLength: ${carrier.length}\nHits: ${carrier.hits}\nIs Sunk: ${carrier.isSunk()}`,
);
