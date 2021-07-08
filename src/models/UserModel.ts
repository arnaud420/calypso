interface User {
  id?: string;
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
  id: string;
  title: string;
  preview: string;
  album: Album;
  artist: Artist;
}

export interface Artist {
  id: string;
  name: string;
  picture: string;
}

export interface Album {
  id: string;
  title: string;
  cover: string;
}

export default User;
