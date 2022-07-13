import React from 'react';

import { func, number, shape } from 'prop-types';

import Tree from '../components/Tree';

export default function AddScreen({ navigation, route }) {
  return (
    <Tree
      navigation={navigation}
      uuid={null}
      initialLocation={route?.params?.location}
    />
  );
}

AddScreen.propTypes = {
  navigation: shape({
    push: func,
  }),
  route: shape({
    params: shape({
      location: shape({
        latitude: number,
        longitude: number,
      }),
    }),
  }),
};
