import { StyleSheet, ViewStyle } from 'react-native';

const photoBtn: ViewStyle = {
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'stretch',
  backgroundColor: 'lightgray',
  borderRadius: 10,
  marginTop: 20,
  marginBottom: 20,
}

const styles = (theme: Record<string, string>) => StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  photoBtnEmpty: {
    ...photoBtn,
    paddingLeft: 20,
  },
  photoBtnFilled: {
    ...photoBtn,
    height: 200,
    alignItems: 'stretch',
  },
  photo: {
    flex: 1,
    height: 200,
    borderRadius: 7,
  },
  textArea: {
    height: 150,
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 15,
  },
})

export default styles
