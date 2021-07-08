import { ThemeType } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const styles = (theme: ThemeType) => StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  scrollView: {
    padding: 20,
  },
  closeButton: {
    height: 40,
    width: 40,
    padding: 5,
  },
  closeIcon: {
    height: 30,
    width: 30,
  },
});

export default styles;
