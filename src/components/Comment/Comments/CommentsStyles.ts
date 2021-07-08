import { ThemeType } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const styles = (theme: ThemeType) => StyleSheet.create({
  seeMore: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10,
  },
  seeMoreText: {
    color: theme['color-danger-400'],
    fontSize: 12,
  },
});

export default styles;
