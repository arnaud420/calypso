import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  f1: {
    flex: 1,
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
  closeBar: {
    width: 100,
    height: 4,
    backgroundColor: '#666666',
    borderRadius: 5,
    marginRight: -40,
  },
  closeContainer: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: '#f7f7f7',
  },
  childrenContainer: {
    padding: 5,
  },
  loader: {
    paddingTop: 25,
    paddingBottom: 25,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
