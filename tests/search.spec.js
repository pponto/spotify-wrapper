import chai, {
  expect
} from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';
chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

describe('Search', () => {
  let spotify;
  let fetchedStub;
  let promise;

  beforeEach(() => {
    spotify = new SpotifyWrapper({
      token: 'foo',
    });

    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.returnsPromise();
  });

  afterEach(() => {
    fetchedStub.restore();
  });
  describe('Smoke Tests', () => {
    it('should exist the spotify.search.albums method', () => {
      expect(spotify.search.albums).to.exist;
    });
    it('should exist the spotify.search.artists method', () => {
      expect(spotify.search.artists).to.exist;
    });
    it('should exist the spotify.search.tracks method', () => {
      expect(spotify.search.tracks).to.exist;
    });
    it('should exist the spotify.search.playlists method', () => {
      expect(spotify.search.playlists).to.exist;
    });
  });

  describe('spotify.search.artists', () => {
    it('should call fetch function', () => {
      const artists = spotify.search.artists();
      expect(fetchedStub).to.have.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const artists = spotify.search.artists('Motorhead');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Motorhead&type=artist");

      const artists2 = spotify.search.artists('Muse');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Muse&type=artist");
    });
  });

  describe('spotify.search.albums', () => {
    it('should call fetch function', () => {
      const albums = spotify.search.albums();
      expect(fetchedStub).to.have.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const albums = spotify.search.albums('Motorhead');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Motorhead&type=album");

      const albums2 = spotify.search.albums('Muse');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Muse&type=album");
    });
  });

  describe('spotify.search.tracks', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.tracks();
      expect(fetchedStub).to.have.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.tracks('Motorhead');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Motorhead&type=track");

      const tracks2 = spotify.search.tracks('Muse');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Muse&type=track");
    });
  });

  describe('spotify.search.playlists', () => {
    it('should call fetch function', () => {
      const tracks = spotify.search.playlists();
      expect(fetchedStub).to.have.calledOnce;
    });
    it('should call fetch with the correct URL', () => {
      const tracks = spotify.search.playlists('Motorhead');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Motorhead&type=playlist");

      const tracks2 = spotify.search.playlists('Muse');
      expect(fetchedStub).to.have.been.calledWith("https://api.spotify.com/v1/search?q=Muse&type=playlist");
    });
  });
});
