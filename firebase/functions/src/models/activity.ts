import { Track } from './users';

export interface Activity {
  user: string;
  addedSongs: Track[];
  removedSongs: Track[];
  date: number;
}