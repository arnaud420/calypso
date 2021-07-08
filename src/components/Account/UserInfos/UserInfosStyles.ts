import { StyleSheet } from 'react-native';

const styles = (theme: Record<string, string>) => StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topRightContainer: {
    flex: 1,
    height: '100%',
    marginLeft: 20,
    padding: 10,
  },
  identityContainer: {
    flex: 1,
  },
  followStatsContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  bold: {
    fontFamily: 'Montserrat_600SemiBold',
  },
  descriptionContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  playlistTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playlistTitle: {
    flexWrap: 'wrap',
    flex: 0.75,
  },
  editBtn: {
    flex: 0.25,
    alignItems: 'flex-end',
    backgroundColor: '#fff',
    borderWidth: 0,
  },
  editBtnText: {
    color: theme['color-info-500'],
  },
  trackList: {
    paddingBottom: 25,
  },
  logout: {
    marginBottom: 40,
  },
})

export default styles
