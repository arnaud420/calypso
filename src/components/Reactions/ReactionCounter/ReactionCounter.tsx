import React from 'react';
import styles from './ReactionCounterStyles';
import { Reaction } from '../../../models/ReactionModel';
import { withStyles } from '@ui-kitten/components';
import { View } from 'react-native';
import { emojis } from '../../../config/emojis';
import Text from '../../Common/Text';

interface Props {
  reactions: Reaction[];
  eva?: any;
}

const ReactionCounter: React.FC<Props> = ({ reactions, eva }: Props) => {
  return (
    <View style={eva.style.container}>
      {
        emojis.map((emoji) => {
          const postReactions = reactions.filter((reaction) => reaction.reaction === emoji.id)

          if (postReactions.length) {
            return (
              <View key={emoji.id} style={eva.style.emojiCounter}>
                <Text>{emoji.symbol}</Text>
                <Text style={eva.style.counterText}>{postReactions.length}</Text>
              </View>
            )
          }

          return null;
        })
      }
    </View>
  );
}

export default withStyles(ReactionCounter, styles);
