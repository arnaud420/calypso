import React from 'react';
import './ButtonLoadingStyles';
import { Button, Spinner } from '@ui-kitten/components';
import { Text } from 'react-native';
import { EvaStatus } from '@ui-kitten/components/devsupport';

interface Props {
  label: string;
  color: EvaStatus;
  action: () => any;
  isLoading: boolean;
  loadingColor: EvaStatus;
  isDisabled?: boolean;
}

const ButtonLoading: React.FC<Props> = (props: Props) => {
  const {
    color, action, isLoading, label, loadingColor, isDisabled,
  } = props;

  return (
    <Button
      status={color}
      onPress={action}
      disabled={isDisabled || false}
      accessoryRight={() => (isLoading ? <Spinner size="tiny" status={loadingColor} /> : <></>)}
    >
      {evaProps => <Text {...evaProps} children={label} />}
    </Button>
  );
}

export default ButtonLoading;
