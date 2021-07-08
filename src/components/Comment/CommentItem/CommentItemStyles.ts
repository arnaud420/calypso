import { ThemeType } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    marginTop: 7,
  },
  image: {
    width: 25,
    height: 25,
    borderRadius: 100,
    marginRight: 10,
    backgroundColor: theme['color-warning-100'],
  },
  texts: {
    flex: 1,
  },
  top: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    color: theme['color-warning-300'],
    fontSize: 12,
  },
  comment: {
    color: theme['color-warning-400'],
  },
});

export default styles;
