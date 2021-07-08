import React, { useEffect, useState } from 'react';
import {
  Alert, Button, Image, StyleProp, TouchableOpacity, View, ViewStyle,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {
  Divider,
  EvaProp, Icon, Spinner, withStyles,
} from '@ui-kitten/components';
import { BottomSheet } from 'react-native-btr';
import styles from './ImagePickerStyles';
import Text from '../Text';

type Props = {
  eva?: EvaProp,
  image: string,
  setImage: (value: string) => void,
  btnStyle?: StyleProp<ViewStyle>,
  photoStyle?: StyleProp<ViewStyle>,
  placeholder?: string,
  isEditable?: boolean,
  defaultUri?: string,
}

const CustomImagePicker = (props: Props) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState<boolean>(false);
  const {
    eva, image, setImage, btnStyle, placeholder, photoStyle, isEditable, defaultUri,
  } = props;

  useEffect(() => {
    (async () => {
      const libraryPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (libraryPermission.status !== 'granted') {
        Alert.alert('Erreur', 'Nous avons besoin de ces accès pour vous permettre de prendre ou de sélectionner une photo');
      }
      const cameraPermission = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraPermission.status !== 'granted') {
        Alert.alert('Erreur', 'Nous avons besoin de ces accès pour vous permettre de prendre ou de sélectionner une photo');
      }
    })();
  }, []);

  useEffect(() => {
    if (defaultUri) {
      setImage(defaultUri)
    }
  }, [defaultUri])

  const pickImage = async (type: string) => {
    setIsLoading(true);

    if (type === 'pick') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage(result.uri);
      }
    } else if (type === 'take') {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
    }
    setIsLoading(false)
    setBottomSheetVisible(false)
  };

  return (
    <View style={eva?.style?.container}>
      <TouchableOpacity onPress={() => setBottomSheetVisible(!bottomSheetVisible)} style={eva?.style?.touchable} disabled={!isEditable}>
        <View style={btnStyle || eva?.style?.photoBtn}>
          {image.length > 0
          && (
            <Image
              source={{ uri: image }}
              style={photoStyle || eva?.style?.photo}
              onLoadEnd={() => setIsLoading(false)}
            />
          )}
          {!image.length && !isLoading && <Text>{placeholder}</Text>}
          {isLoading && (
            <View style={eva?.style?.loaderContainer}>
              <Spinner size="medium" status="danger" />
            </View>
          )}
        </View>
        {isEditable
        && (
          <View style={eva?.style?.editIconContainer}>
            <Icon name="edit-outline" style={eva?.style?.editIcon} fill="#fff" />
          </View>
        )}
      </TouchableOpacity>

      <BottomSheet
        visible={bottomSheetVisible}
        onBackButtonPress={() => setBottomSheetVisible(!bottomSheetVisible)}
        onBackdropPress={() => setBottomSheetVisible(!bottomSheetVisible)}
      >
        <View style={eva?.style?.bottomSheetContainer}>
          <Button onPress={() => pickImage('take')} title="Prendre une photo" />
          <Divider />
          <Button onPress={() => pickImage('pick')} title="Ouvrir la bibliothèque" />
        </View>
      </BottomSheet>
    </View>
  );
}

export default withStyles(CustomImagePicker, styles)
