import './index.css';

import { LocationForm } from './components/LocationForm';

document.body.appendChild(
  LocationForm((location) => console.log(`The location is: ${location}`)),
);
