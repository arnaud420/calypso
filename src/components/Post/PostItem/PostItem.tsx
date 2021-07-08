import React from 'react';
import { withStyles } from '@ui-kitten/components';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setAllowScroll } from '../../../redux/features/post/postSlice';
import styles from './PostItemStyles';
import { FeedItemTop } from '../../Feed/FeedItemTop';
import { FeedItemImage } from '../../Feed/FeedItemImage';
import { FeedItemText } from '../../Feed/FeedItemText';
import { Post } from '../../../models/PostModel';
import { EmojiReactions } from '../../Reactions/EmojiReactions';
import { CreateComment } from '../../Comment/CreateComment';
import { createPostComment, handlePostReaction } from '../../../redux/features/post/postAction';
import { Comments } from '../../Comment/Comments';
import { RootState } from '../../../redux/store';
import { setSelectedUser } from '../../../redux/features/user/userSlice';

interface Props {
  post: Post;
  eva?: any;
}

const PostItem: React.FC<Props> = ({ post, eva }: Props) => {
  const { currentUser } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  return (
    <View style={eva.style.container}>
      <FeedItemTop
        title={`${post.user.firstname} ${post.user.lastname}`}
        dateInSeconds={post.publishDate as number}
        onTitleTouch={() => dispatch(setSelectedUser(post.user))}
      />
      {
        post.image.length > 0
        && <FeedItemImage uri={post.image} />
      }
      <EmojiReactions
        userReaction={post.reactions.find((reaction) => reaction.userId === currentUser?.uid)?.reaction || null}
        reactions={post.reactions}
        onPress={(isOpen) => dispatch(setAllowScroll(!isOpen))}
        onChange={(reaction) => dispatch(
          handlePostReaction({ postId: post.id as string, reaction }),
        )}
      />
      <FeedItemText text={post.content} enableSeeMore />
      <Comments comments={post.comments} />
      <CreateComment
        onSubmit={(comment) => (dispatch(
          createPostComment({ postId: post.id as string, comment }),
        ))}
      />
    </View>
  )
}

export default withStyles(PostItem, styles);
