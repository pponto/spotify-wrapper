import chai, {
  expect
} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import {
  search,
  searchAlbums,
  searchPlaylists,
  searchTracks,
  searchArtists
} from '../src/main';

describe('Spotify Wrapper', () => {
  describe('Smoke Tests', () => {
    // search (genérico)- + de 1 tipo
    // searchAlbums
    // searchArtists
    // searchTracks
    // searchPlaylists

    it('should exist the search method', () => {
      expect(search).to.exist;
    });
    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });
    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });
    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });
    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });
  describe('Generic Search', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });
    it('should call fetch function', () => {
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      context('passing one type', () => {
        const artist = search('Incubus', 'artist');

        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

        const albums = search('Incubus', 'album');
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');
      });

      context('passing more than one type', () => {
        const artistsAndAlbums = search('Incubus', ['artist', 'album']);
        expect(fetchedStub).to.have.been.calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist,album')
      });
    });
    it('should return the JSON Data from the Promise', () => {
      promise.resolves({ body: 'json' });
      const artists = search('Incubus', 'artist');

      expect(artists.resolveValue).to.be.eql({ body: 'json' });
    });
  });
  describe('searchArtists', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });
    it('should call fetch function', () => {
      const artists = searchArtists();
      expect(fetchedStub).to.have.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Motorhead');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Motorhead&type=artist");

      const artists2 = searchArtists('Muse');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Muse&type=artist");
    });
  });
  describe('searchAlbums', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });
    it('should call fetch function', () => {
      const albums = searchAlbums();
      expect(fetchedStub).to.have.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Motorhead');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Motorhead&type=album");

      const albums2 = searchAlbums('Muse');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Muse&type=album");
    });
  });
  describe('searchTracks', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });
    it('should call fetch function', () => {
      const tracks = searchTracks();
      expect(fetchedStub).to.have.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Motorhead');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Motorhead&type=track");

      const tracks2 = searchTracks('Muse');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Muse&type=track");
    });
  });
  describe('searchPlaylists', () => {
    let fetchedStub;
    let promise;

    beforeEach(() => {
      fetchedStub = sinon.stub(global, 'fetch');
      promise = fetchedStub.returnsPromise();
    });

    afterEach(() => {
      fetchedStub.restore();
    });
    it('should call fetch function', () => {
      const tracks = searchPlaylists();
      expect(fetchedStub).to.have.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const tracks = searchPlaylists('Motorhead');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Motorhead&type=playlist");

      const tracks2 = searchPlaylists('Muse');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Muse&type=playlist");
    });
  });
});
