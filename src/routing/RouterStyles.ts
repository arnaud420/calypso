import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  header: {
    height: 60,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  brand: {
    fontSize: 25,
    fontFamily: 'Amarante_400Regular',
    color: '#fff',
  },
  searchBtn: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  backBtn: {
    marginLeft: 5,
  },
  searchIcon: {
    width: '100%',
    height: '100%',
  },
  tabBarIcon: {
    width: 32,
    height: 32,
  },
});

export default styles;
