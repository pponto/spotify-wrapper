global.fetch = require('node-fetch');

import { searchAlbums } from '../src/search';

const albums = searchAlbums('Muse');

albums.then(data => console.log(data));
