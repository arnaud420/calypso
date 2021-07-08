import React, {
  useEffect, useRef, useState,
} from 'react';
import {
  View, Animated, PanResponder, GestureResponderEvent, LayoutChangeEvent,
} from 'react-native';
import { Icon, withStyles } from '@ui-kitten/components';
import styles from './EmojiReactionsStyles';
import Text from '../../Common/Text';
import { myTheme } from '../../../../custom-theme';
import { emojis } from '../../../config/emojis';
import { ReactionCounter } from '../ReactionCounter';
import { Reaction } from '../../../models/ReactionModel';

interface Props {
  eva?: any;
  onPress?: (isOpen: boolean) => void;
  onChange: (selected: string) => void;
  userReaction: string|null;
  reactions: Reaction[];
}

interface EmojisAnimations {
  [key: string]: Animated.Value;
}

interface EmojiLayouts {
  [key: string]: EmojiLayout;
}

interface EmojiLayout {
  left: number,
  right: number,
}

const EmojiReactions: React.FC<Props> = (props: Props) => {
  const { eva, onPress, onChange, reactions, userReaction } = props;
  const [selected, setSelected] = useState<string|null>(userReaction);
  const [isOpen, setIsOpen] = useState(false);
  const [emojiTouched, setEmojiTouched] = useState('');
  const emojiTouchedRef = useRef(emojiTouched)
  const containerAnimation = useRef(new Animated.Value(0)).current;
  const [emojiLayouts, setEmojisLayouts] = useState<EmojiLayouts>({});
  const emojiLayoutsRef = useRef(emojiLayouts);
  const emojisScales: EmojisAnimations = {};

  emojis.forEach((img) => {
    emojisScales[img.id] = useRef(new Animated.Value(1)).current;
  });

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => { open() },
      onPanResponderMove: (evt, gestureState) => { onMove(evt) },
      onPanResponderRelease: (evt, gestureState) => { close() },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderTerminate: (evt, gestureState) => { close() },
    }),
  ).current;

  useEffect(() => {
    emojiTouchedRef.current = emojiTouched
  }, [emojiTouched])

  useEffect(() => {
    emojiLayoutsRef.current = emojiLayouts
  }, [emojiLayouts])

  useEffect(() => {
    if (onPress) {
      onPress(isOpen);
    }
  }, [isOpen])

  useEffect(() => {
    if (selected && selected !== userReaction) {
      onChange(selected);
    }
  }, [selected])

  const open = () => {
    Animated.timing(containerAnimation, {
      useNativeDriver: true,
      duration: 100,
      toValue: 1,
    }).start(() => setIsOpen(true));
  }

  const close = () => {
    if (emojiTouchedRef.current) {
      setSelected(emojiTouchedRef.current)
      reduceEmojiSize(emojisScales[emojiTouchedRef.current]);
    }
    setEmojiTouched('');

    Animated.timing(containerAnimation, {
      useNativeDriver: true,
      duration: 100,
      toValue: 0,
    }).start(() => setIsOpen(false));
  }

  const increaseEmojiSize = (imgAnimation: Animated.Value) => {
    Animated.timing(imgAnimation, {
      useNativeDriver: true,
      duration: 100,
      toValue: 1.5,
    }).start();
  }

  const reduceEmojiSize = (imgAnimation: Animated.Value) => {
    Animated.timing(imgAnimation, {
      useNativeDriver: true,
      duration: 50,
      toValue: 1,
    }).start();
  }

  const getTouchedEmoji = (x: number) => (
    Object.keys(emojiLayoutsRef.current).find((key) => (
      x >= emojiLayoutsRef.current[key].left && x <= emojiLayoutsRef.current[key].right))
  )

  const onMove = (event: GestureResponderEvent) => {
    const emojiCurrentlyTouched = getTouchedEmoji(Math.ceil(event.nativeEvent.locationX));

    if (emojiCurrentlyTouched && emojiTouchedRef.current !== emojiCurrentlyTouched) {
      increaseEmojiSize(emojisScales[emojiCurrentlyTouched]);
      setEmojiTouched(emojiCurrentlyTouched);
    }
    if (emojiTouchedRef.current.length && emojiTouchedRef.current !== emojiCurrentlyTouched) {
      reduceEmojiSize(emojisScales[emojiTouchedRef.current]);
    }
  }

  const handleLayoutPosition = (event: LayoutChangeEvent, imgId: string) => {
    if (!emojiLayouts[imgId]) {
      const left = event.nativeEvent.layout.x;
      const right = event.nativeEvent.layout.x + event.nativeEvent.layout.width;

      setEmojisLayouts(prevState => ({
        ...prevState,
        [imgId]: { left, right },
      }))
    }
  }

  return (
    <View style={eva.style.container} {...panResponder.panHandlers}>
      <View style={eva.style.emojiCounter}>
        <Text style={eva.style.emoji}>
          {emojis.find((emoji) => emoji.id === selected)?.symbol || (
          <Icon
            style={eva.style.emoji}
            fill={myTheme['color-primary-500']}
            name="plus-circle-outline"
          />
          )}
        </Text>

        <ReactionCounter reactions={reactions} />
      </View>

      <Animated.View
        style={[eva.style.emojiContainer, {
          transform: [{ scaleY: containerAnimation }],
          overflow: isOpen ? 'visible' : 'hidden',
        }]}
      >
        {
          emojis.map((img) => (
            <Animated.Text
              key={img.id}
              onLayout={(event) => handleLayoutPosition(event, img.id)}
              style={[eva.style.emoji, { transform: [{ scale: emojisScales[img.id] }] }]}
            >
              {img.symbol}
            </Animated.Text>
          ))
        }
      </Animated.View>
    </View>
  )
}

export default withStyles(EmojiReactions, styles);
