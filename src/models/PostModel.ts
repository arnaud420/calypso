import { firestore } from 'firebase';
import UserModel from './UserModel';
import { Comment } from './CommentModel';
import { Reaction } from './ReactionModel';

export interface Post {
  id?: string|firestore.DocumentReference<firestore.DocumentData>;
  publishDate: firestore.Timestamp|number;
  user: UserModel,
  content: string;
  image: string;
  comments: Comment[];
  reactions: Reaction[];
  // music?: ;
}
