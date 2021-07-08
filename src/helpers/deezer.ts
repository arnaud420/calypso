import { DEEZER_URI } from '../config';
import { Album, Track } from '../models/UserModel';

export const getTrackList = async (albumId: string) => {
  try {
    const data = await fetch(`${DEEZER_URI}/album/${albumId}/tracks`);
    const json = await data.json();
    return json.data;
  } catch (error) {
    console.error('err', error);
    throw (error);
  }
}

export const getArtist = async (artistId: string) => {
  try {
    const data = await fetch(`${DEEZER_URI}/artist/${artistId}`);
    const json = await data.json();
    return json;
  } catch (error) {
    console.error('err', error);
    throw (error);
  }
}

export const getAlbums = async (artistId: string, maxTracksLength: number) => {
  try {
    const data = await fetch(`${DEEZER_URI}/artist/${artistId}/albums`);
    const json = await data.json();
    const promises = json.data.map((album: Album) => getTrackList(album.id)
      .then((tracks: Array<Track>) => ({
        ...album,
        tracks,
        trackSliced: tracks.length > maxTracksLength ? maxTracksLength : tracks.length,
      })));
    const albumWithTracks: Array<Album> = await Promise.all(promises);
    return albumWithTracks.sort((a, b) => a.title.localeCompare(b.title));
  } catch (error) {
    console.error('err', error);
    throw (error);
  }
}
