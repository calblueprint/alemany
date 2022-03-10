import React, { useEffect, useState } from 'react';

import storage from '@react-native-firebase/storage';
import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Card } from 'react-native-paper';

export default function SearchCard({ name, id, onPress }) {
  const [imageUrl, setImageUrl] = useState(undefined);

  useEffect(() => {
    storage()
      .ref('test_uuid.jpeg')
      .getDownloadURL()
      .then(url => {
        setImageUrl(url);
      });
  }, []);
  return (
    <Card
      style={{
        height: 100,
        marginTop: 20,
        flexDirection: 'row',
      }}
      onPress={onPress}
    >
      <Card.Title
        title={name}
        subtitle={id}
        style={{ position: 'absolute', alignItems: 'flex-start', flex: 1 }}
      />
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          width: 50,
          height: 70,
          flex: 2,
        }}œ
      />
    </Card>
  );
}

SearchCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  onPress: PropTypes.func,
};
