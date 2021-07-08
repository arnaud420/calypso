import User, { Track } from './UserModel';

export interface FirestoreActivity {
  user: string;
  removedSongs: Track[];
  addedSongs: Track[];
  date: number;
}

interface Activity {
  user?: User;
  removedSongs: Track[];
  addedSongs: Track[];
  date: number;
}

export default Activity;
