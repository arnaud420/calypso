import { StyleSheet } from 'react-native';
import { ThemeType } from '@ui-kitten/components';

const styles = (theme: ThemeType) => StyleSheet.create({
  container: {
    zIndex: 90,
    height: 50,
    maxWidth: '50%',
  },
  emojiCounter: {
    position: 'absolute',
    bottom: 10,
    left: 5,
    flexDirection: 'row',
  },
  emojiContainer: {
    position: 'absolute',
    top: -49,
    left: 4,
    padding: 5,
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderColor: theme['color-warning-100'],
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row',
  },
  emoji: {
    fontSize: 28,
    width: 33,
    height: 33,
    overflow: 'visible',
  },
});

export default styles;
