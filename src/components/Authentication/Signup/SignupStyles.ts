import { StyleSheet } from 'react-native'

const styles = (theme: Record<string, string>) => StyleSheet.create({
  layout: {
    backgroundColor: theme['color-danger-700'],
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  logo: {
    tintColor: '#fff',
    resizeMode: 'contain',
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  scrollView: {
    alignItems: 'center',
    padding: 30,
  },
  input: {
    marginBottom: 20,
  },
  textArea: {
    height: 150,
  },
  inputContainer: {
    width: '100%',
  },
  errorText: {
    marginBottom: 10,
    marginTop: -15,
    color: '#fff',
  },
  profilePicture: {
    alignItems: 'center',
  },
})

export default styles
