import React from 'react';
import { View } from 'react-native';
import { withStyles } from '@ui-kitten/components';
import { formatTimeSince } from '../../../helpers/genericHelper';
import styles from './FeedItemTopStyles';
import Text from '../../Common/Text';

interface Props {
  title: string;
  dateInSeconds: number;
  onTitleTouch?: () => void;
  eva?: any;
}

const FeedItemTop: React.FC<Props> = (props: Props) => {
  const {
    title, dateInSeconds, onTitleTouch, eva,
  } = props;

  return (
    <View style={eva.style.top}>
      <Text
        category="h5"
        onPress={() => (onTitleTouch ? onTitleTouch() : null)}
        suppressHighlighting
      >
        { title }
      </Text>
      <Text style={eva.style.date}>{formatTimeSince(dateInSeconds)}</Text>
    </View>
  );
};

export default withStyles(FeedItemTop, styles);
