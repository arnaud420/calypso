import { StyleSheet } from 'react-native';

const styles = (theme: Record<string, string>) => StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
  btn: {
    borderWidth: 0,
  },
  errorText: {
    marginBottom: 10,
    color: '#fff',
  },
  whiteText: {
    color: '#fff',
  },
});

export default styles
