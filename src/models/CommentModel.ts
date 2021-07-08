import { firestore } from 'firebase';
import UserModel from './UserModel';

export interface Comment {
  user: UserModel;
  content: string;
  publishDate: number;
}
