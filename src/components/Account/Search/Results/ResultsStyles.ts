import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  newsImage: {
    width: 100,
    height: '100%',
    resizeMode: 'cover',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
    resizeMode: 'contain',
  },
  newsDescription: {
    marginLeft: 8,
  },
})

export default styles
