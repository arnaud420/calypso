import { ThemeType } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: 200,
    borderRadius: 7,
    backgroundColor: theme['color-warning-100'],
  },
  image: {
    height: 200,
    borderRadius: 7,
  },
  loaderContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
