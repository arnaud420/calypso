import React from 'react';
import { View } from 'react-native';
import { Spinner, withStyles } from '@ui-kitten/components';
import { EvaStatus } from '@ui-kitten/components/devsupport';
import styles from './LoadingStyles';

interface Props {
  eva?: any;
  color?: EvaStatus;
}

const Loading: React.FC<Props> = ({ eva, color }: Props) => (
  <View style={eva.style.container}>
    <Spinner status={color || 'primary'} />
  </View>
)

export default withStyles(Loading, styles);
