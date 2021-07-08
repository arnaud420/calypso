import { ThemeType } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
  },
  button: {
    backgroundColor: theme['color-danger-600'],
    width: 35,
    height: 35,
    borderRadius: 100,
    margin: 10,
    padding: 7,
  },
  icon: {
    transform: [{ rotate: '45deg' }],
  },
});

export default styles;
