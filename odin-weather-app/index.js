import './index.css';

import createElement from './helpers/createElement';
import LocationForm from './components/LocationForm';

document.body.appendChild(createElement('h1', 'app-title', 'Odin Weather App'));

document.body.appendChild(
  LocationForm((location) => console.log(`The location is: ${location}`)),
);
