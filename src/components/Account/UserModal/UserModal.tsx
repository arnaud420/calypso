import React from 'react';
import './UserModalStyles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import UserInfos from '../UserInfos';
import { Modal } from '../../Modal';
import { RootState } from '../../../redux/store';
import { setSelectedUser } from '../../../redux/features/user/userSlice';

interface Props {}

const UserModal: React.FC<Props> = (props: Props) => {
  const navigation = useNavigation()
  const selectedUser = useSelector((state: RootState) => state.user.selectedUser);
  const dispatch = useDispatch();

  return (
    <Modal
      isVisible={selectedUser !== null}
      onClose={() => dispatch(setSelectedUser(null))}
    >
      <UserInfos navigation={navigation} user={selectedUser} />
    </Modal>
  );
}

export default UserModal;
