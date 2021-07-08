import React from 'react';
import { withStyles } from '@ui-kitten/components';
import styles from './FeedItemTitleStyles';
import Text from '../../Common/Text';

interface Props {
  title: string;
  eva?: any;
}

const FeedItemTitle: React.FC<Props> = ({ title, eva }: Props) => (
  <Text category="h5" style={eva.style.title}>{ title }</Text>
);

export default withStyles(FeedItemTitle, styles);
