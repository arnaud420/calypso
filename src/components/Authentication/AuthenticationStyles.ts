import { StyleSheet } from 'react-native';

const styles = (theme: Record<string, string>) => StyleSheet.create({
  layout: {
    backgroundColor: theme['color-danger-700'],
    flex: 1,
  },
  gradientContainer: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logo: {
    tintColor: '#fff',
    resizeMode: 'contain',
    width: 100,
    height: 100,
    marginBottom: 10,
    marginTop: 20,
  },
  brand: {
    fontSize: 60,
    fontFamily: 'Amarante_400Regular',
    color: '#fff',
    flex: 1,
  },
  topPart: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomPart: {
    flex: 0.6,
    paddingLeft: 40,
    paddingRight: 40,
  },
  mb10: {
    marginBottom: 10,
  },
  btn: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    marginTop: -18,
  },
});

export default styles
