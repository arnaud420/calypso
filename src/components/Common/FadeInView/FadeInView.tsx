import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { Animated } from 'react-native';

type Props = {
  style?: object,
  children: PropTypes.ReactNodeLike,
  fadeInDuration?: number
};

const FadeInView = ({ fadeInDuration, children, style }: Props) => {
  const fadeAnim = useRef(new Animated.Value(0)).current // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(
      fadeAnim,
      {
        toValue: 1,
        duration: fadeInDuration ?? 10000,
        useNativeDriver: false,
      },
    ).start();
  }, [fadeAnim])

  return (
    <Animated.View
      style={{
        ...style,
        opacity: fadeAnim,
      }}
    >
      {children}
    </Animated.View>
  );
}

export default FadeInView
