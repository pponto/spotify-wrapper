/* to run: babel-node albums.js */
global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'BQCrY_QfkGPUn1awlIdFJNtGIuJxlnOkfP_nJUBl5C9VSw_t9SWheIb9ov08oJ8cvn4mjck187OW0uDbzqkw2OcWwCj3xx_s45ostQ3CrmLktAmzZZwCCIltArQp0zc18tSKog',
});

const albums = spotify.search.albums('Muse');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
