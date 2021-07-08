import React, { useState } from 'react';
import { Input, withStyles } from '@ui-kitten/components';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { showMessage } from 'react-native-flash-message';
import { CommonActions } from '@react-navigation/native';
import styles from './CreatePostStyles';
import { MainLayout } from '../../MainLayout';
import Text from '../../Common/Text';
import ImagePicker from '../../Common/ImagePicker/ImagePicker';
import { RootState } from '../../../redux/store';
import { BottomTabsParamList, RootStackParamList, SCREENS } from '../../../routing/Router';
import { ButtonLoading } from '../../Common/ButtonLoading';
import { createPost } from '../../../redux/features/post/postAction';

interface Props {
  eva?: any,
  navigation: StackNavigationProp<BottomTabsParamList, SCREENS.CREATE_POST_SCREEN>;
}

const CreatePost: React.FC<Props> = ({ eva, navigation }: Props) => {
  const [image, setImage] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentUser } = useSelector((state: RootState) => state.authentication);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const success = await createPost(currentUser!.uid, content.trim(), image);
      setIsLoading(false);

      if (success) {
        setImage('');
        setContent('');

        return navigation.navigate(
          SCREENS.ACTIVITIES_SCREEN,
          { screen: SCREENS.ACTIVITIES_SCREEN },
        );
      }

      throw new Error('Le post n\'a pas pu être créé.');
    } catch (e) {
      showMessage({
        message: `Une erreur est survenue : ${e.message}`,
        type: 'danger',
      });
    }
  }

  return (
    <MainLayout>
      <Text category="h4" style={eva.style.title}>Nouveau post</Text>
      {/* TODO: Add MusicSelector  */}

      <ImagePicker
        image={image}
        setImage={setImage}
        btnStyle={image.length ? eva.style.photoBtnFilled : eva.style.photoBtnEmpty}
        photoStyle={eva.style.photo}
        placeholder="Ajouter une image"
        isEditable
      />

      <Input
        value={content}
        onChangeText={setContent}
        textContentType="none"
        keyboardType="default"
        multiline
        numberOfLines={6}
        textStyle={eva.style.textArea}
      />

      <View style={eva.style.btnContainer}>
        <ButtonLoading
          label="Publier"
          color="danger"
          action={handleSubmit}
          isLoading={isLoading}
          loadingColor="success"
          isDisabled={isLoading || content.trim().length < 1}
        />
      </View>
    </MainLayout>
  )
}

export default withStyles(CreatePost, styles);
