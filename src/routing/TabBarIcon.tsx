import { Icon } from '@ui-kitten/components';
import React from 'react'
import styles from './RouterStyles'

type Props = {
  focused: boolean,
  name: string,
  focusedColor: string,
}

const TabBarIcon = ({ focused, name, focusedColor }: Props) => (
  <Icon name={name} style={styles.tabBarIcon} fill={focused ? focusedColor : '#e3e3e3'} />
);

export default TabBarIcon
