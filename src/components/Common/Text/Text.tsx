import React from 'react'
import { Text as UIKittenText, TextProps } from '@ui-kitten/components'
import { StyleProp, TextStyle } from 'react-native';

interface Props extends TextProps {
  style?: StyleProp<TextStyle>;
}

const Text = (props: Props) => {
  const { style } = props;

  return <UIKittenText {...props} style={{ ...(style as undefined|null|object), fontFamily: style && style.fontFamily && style.fontFamily !== 'System' ? style.fontFamily : 'Montserrat_400Regular' }} />
}

export default Text
