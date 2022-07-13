import React from 'react';

import { func, number, shape } from 'prop-types';

import Tree from '../components/Tree';
import { addTree } from '../database/firebase';

export default function AddScreen({ navigation, route }) {
  const handleSave = async tree => {
    const uuid = await addTree(tree);
    navigation.push('TreeScreen', { uuid });
  };
  return (
    <Tree
      navigation={navigation}
      onSave={handleSave}
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
