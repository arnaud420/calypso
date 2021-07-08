import {User} from './users';
import {Comment} from './comments';

export interface Post {
  id?: string;
  publishDate: number;
  user: User,
  content: string;
  image: string;
  comments: Comment[];
  // music?: ;
}
