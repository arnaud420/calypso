import React from 'react';
import { Image, View } from 'react-native';
import { withStyles } from '@ui-kitten/components';
import styles from './CommentItemStyles';
import { Comment } from '../../../models/CommentModel';
import Text from '../../Common/Text';
import { formatTimeSince } from '../../../helpers/genericHelper';

interface Props {
  comment: Comment;
  eva?: any;
}

const CommentItem: React.FC<Props> = ({ comment, eva }: Props) => (
  <View style={eva.style.container}>
    <Image source={{ uri: comment.user.profilePicture }} style={eva.style.image} />

    <View style={eva.style.texts}>
      <View style={eva.style.top}>
        <Text style={eva.style.username}>{`${comment.user.firstname} ${comment.user.lastname}`}</Text>
        <Text style={eva.style.date}>{formatTimeSince(comment.publishDate)}</Text>
      </View>
      <Text style={eva.style.comment}>{comment.content}</Text>
    </View>
  </View>
)

export default withStyles(CommentItem, styles);
