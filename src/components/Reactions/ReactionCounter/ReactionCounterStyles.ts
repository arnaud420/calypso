import { StyleSheet } from 'react-native';
import { ThemeType } from '@ui-kitten/components';

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderLeftWidth: 1,
    borderLeftColor: theme['color-danger-100'],
    marginLeft: 7,
  },
  emojiCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 5,
  },
  counterText: {
    color: theme['color-info-600'],
    marginLeft: 5,
  }
});

export default styles;
