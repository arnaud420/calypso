import React, { ReactElement } from 'react';
import {
  Button, ScrollView, View, Modal as ModalNative, TouchableOpacity,
} from 'react-native';
import { Icon, withStyles } from '@ui-kitten/components';
import styles from './ModalStyles';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  children: ReactElement|ReactElement[];
  eva?: any;
}

const Modal: React.FC<Props> = (props: Props) => {
  const {
    isVisible, onClose, children, eva,
  } = props;

  return (
    <ModalNative
      animationType="slide"
      visible={isVisible}
      presentationStyle="formSheet"
    >
      <View style={eva.style.modal}>
        <View style={eva.style.buttonContainer}>
          <TouchableOpacity onPress={onClose} style={eva.style.closeButton}>
            <Icon name="close-outline" fill="#666666" style={eva.style.closeIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView style={eva.style.scrollView}>
          {children}
        </ScrollView>
      </View>
    </ModalNative>
  );
};

export default withStyles(Modal, styles);
