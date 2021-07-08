import React, { useState } from 'react';
import { withStyles } from '@ui-kitten/components';
import styles from './FeedItemTextStyles';
import Text from '../../Common/Text';

interface Props {
  text: string;
  limit?: number;
  eva?: any;
  enableSeeMore?: boolean;
}

const FeedItemText: React.FC<Props> = (props: Props) => {
  const {
    // eslint-disable-next-line react/destructuring-assignment
    limit = props.limit !== undefined ? props.limit : 200,
    text,
    eva,
    enableSeeMore,
  } = props;
  const [textLimit, setTextLimit] = useState(limit);

  const handleTouch = () => {
    if (enableSeeMore) {
      setTextLimit(textLimit === limit ? text.length : limit)
    }
  }

  return (
    <Text
      category="p1"
      style={eva.style.text}
      onPress={handleTouch}
      suppressHighlighting
    >
      { text.slice(0, textLimit) }
      { text.length > textLimit ? '...' : '' }
    </Text>
  );
};

export default withStyles(FeedItemText, styles);
