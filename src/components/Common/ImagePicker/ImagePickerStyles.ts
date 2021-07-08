import { StyleSheet } from 'react-native';

const styles = (theme: Record<string, string>) => StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  touchable: {
    alignSelf: 'stretch',
  },
  photoBtn: {
    width: 130,
    height: 130,
    borderRadius: 130,
    overflow: 'hidden',
    backgroundColor: 'lightgray',
  },
  photo: {
    width: 130,
    height: 130,
  },
  editIconContainer: {
    backgroundColor: theme['color-danger-500'],
    position: 'absolute',
    right: 5,
    bottom: 5,
    height: 32,
    width: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
  editIcon: {
    height: 22,
    width: 22,
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
  bottomSheetContainer: {
    backgroundColor: '#fff',
    width: '100%',
    height: 120,
    padding: 10,
    justifyContent: 'flex-start',
    // alignItems: 'center',
  },
})

export default styles
