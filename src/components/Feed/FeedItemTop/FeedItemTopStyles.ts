import { ThemeType } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const styles = (theme: ThemeType) => StyleSheet.create({
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 7,
    marginBottom: 7,
  },
  date: {
    color: theme['color-warning-400'],
  },
});

export default styles;
