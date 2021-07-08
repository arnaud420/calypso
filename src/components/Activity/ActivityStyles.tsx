import { ThemeType } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const styles = (theme: ThemeType) => StyleSheet.create({
  removedSong: {
    color: 'red',
    textDecorationLine: 'line-through',
  },
});

export default styles;
