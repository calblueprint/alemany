import React from 'react';

import { func, shape } from 'prop-types';

import Tree from '../components/Tree';
import { addTree } from '../database/firebase';

export default function AddScreen({ navigation }) {
  const handleSave = async tree => {
    const uuid = await addTree(tree);
    navigation.push('TreeScreen', { uuid });
  };
  return <Tree onSave={handleSave} uuid={null} />;
}

AddScreen.propTypes = {
  navigation: shape({
    push: func,
  }),
};
