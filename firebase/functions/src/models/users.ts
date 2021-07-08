export interface User {
  uid: string;
  email: string;
  password: string;
  lastname: string;
  firstname: string;
  description: string;
  profilePicture: string;
  followers: Array<string>;
  followings: Array<string>;
  top?: Array<Track>;
  token?: string;
}

export interface Track {
  id: number;
  title: string;
  preview: string;
  album: Album;
  artist: Artist;
}

export interface Artist {
  id: number;
  name: string;
  picture: string;
}

export interface Album {
  id: number;
  title: string;
  cover: string;
}
