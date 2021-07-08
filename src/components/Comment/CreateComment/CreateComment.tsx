import React, { useEffect, useRef, useState } from 'react';
import { Icon, Input, withStyles } from '@ui-kitten/components';
import {
  TouchableHighlight, View, Animated, Keyboard,
} from 'react-native';
import styles from './CreateCommentStyles';
import { myTheme } from '../../../../custom-theme';

interface Props {
  eva?: any;
  onSubmit: (comment: string) => void;
}

const CreateComment: React.FC<Props> = ({ eva, onSubmit }: Props) => {
  const [comment, setComment] = useState<string>('')
  const fadeAnimation = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    if (comment.length === 1) {
      startAnimation(1)
    } else if (comment.length === 0) {
      startAnimation(0.5)
    }
  }, [comment])

  const startAnimation = (toValue: number) => {
    Animated.timing(fadeAnimation, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }

  const handleOnSubmit = () => {
    onSubmit(comment);
    Keyboard.dismiss();
    setComment('');
  }

  return (
    <View style={eva.style.container}>
      <Input
        value={comment}
        onChangeText={(value) => setComment(value)}
        placeholder="Ecrivez un commentaire"
        textContentType="none"
        keyboardType="default"
        multiline
        numberOfLines={6}
        style={eva.style.input}
      />

      <Animated.View style={{ opacity: fadeAnimation }}>
        <TouchableHighlight
          style={eva.style.button}
          underlayColor={myTheme['color-danger-500']}
          onPress={handleOnSubmit}
          disabled={comment.length <= 0}
        >
          <Icon name="paper-plane-outline" fill="white" style={eva.style.icon} />
        </TouchableHighlight>
      </Animated.View>
    </View>
  )
}

export default withStyles(CreateComment, styles);
