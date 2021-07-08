import {User} from './users';
import {firestore} from 'firebase-admin/lib/firestore';

export interface Comment {
  user: User;
  content: string;
  publishDate: number|firestore.Timestamp
}
