import React, { useEffect, useState } from 'react';
import { TouchableHighlight, TouchableOpacity, View } from 'react-native';
import { withStyles } from '@ui-kitten/components';
import styles from './CommentsStyles';
import { Comment } from '../../../models/CommentModel';
import { CommentItem } from '../CommentItem';
import Text from '../../Common/Text';

interface Props {
  comments: Comment[];
  eva?: any;
}

const Comments: React.FC<Props> = ({ eva, comments }: Props) => {
  const [sortedComments, setSortedComments] = useState(comments);
  const [isFolded, setIsFolded] = useState(true);

  useEffect(() => {
    // Sort by last comment published first.
    const sorted = comments.slice().sort((a, b) => (
      b.publishDate - a.publishDate
    ));

    setSortedComments(sorted)
  }, [comments]);

  return (
    <View>
      {
        sortedComments.slice(0, isFolded ? 1 : sortedComments.length).map((comment: Comment) => (
          <CommentItem
            comment={comment}
            key={`comment-${comment.user.uid}-${comment.publishDate}`}
          />
        ))
      }
      {
        sortedComments.length > 1 && (
          <TouchableOpacity
            style={eva.style.seeMore}
            onPress={() => setIsFolded(prevState => !prevState)}
          >
            <Text style={eva.style.seeMoreText}>{`Voir ${isFolded ? 'plus' : 'moins'}`}</Text>
          </TouchableOpacity>
        )
      }
    </View>
  )
}

export default withStyles(Comments, styles);
