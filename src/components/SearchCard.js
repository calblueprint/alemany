import React from 'react';

import PropTypes from 'prop-types';
import { View, Image } from 'react-native';
import { Card } from 'react-native-paper';

export default function SearchCard({ name, id, onPress }) {
  return (
    <Card
      style={{
        height: 100,
        marginTop: 20,
      }}
      onPress={onPress}
    >
      <Card.Title
        title={name}
        subtitle={id}
        style={{ alignItems: 'flex-start' }}
      />
      <Card.Cover
        source={{
          uri: 'https://waste4change.com/blog/wp-content/uploads/niko-photos-tGTVxeOr_Rs-unsplash-2048x1365.jpg',
        }}
        style={{
          width: 50,
          height: 70,
        }}
      />
    </Card>
  );
}

SearchCard.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  onPress: PropTypes.func,
};
