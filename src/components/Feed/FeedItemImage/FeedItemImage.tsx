import React, { useState } from 'react';
import { Image, View } from 'react-native';
import { Spinner, withStyles } from '@ui-kitten/components';
import styles from './FeedItemImageStyles';

interface Props {
  uri: string;
  eva?: any;
}

const FeedItemImage: React.FC<Props> = (props: Props) => {
  const { uri, eva } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <View style={eva.style.container}>
      <Image
        style={eva.style.image}
        source={{ uri }}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />

      { isLoading && (
        <View style={eva.style.loaderContainer}>
          <Spinner status="info" />
        </View>
      )}
    </View>
  );
};

export default withStyles(FeedItemImage, styles);
