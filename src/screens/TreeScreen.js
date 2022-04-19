import React from 'react';

import { func, shape, string } from 'prop-types';

import Tree from '../components/Tree';
import { deleteTree, setTree } from '../database/firebase';

export default function TreeScreen({ route, navigation }) {
  const { uuid } = route.params;
  const handleSave = tree => {
    setTree(tree);
  };
  const handleDelete = async () => {
    await deleteTree(uuid);
    navigation.pop();
  };
  return <Tree onSave={handleSave} onDelete={handleDelete} uuid={uuid} />;
}

TreeScreen.propTypes = {
  route: shape({
    params: shape({
      uuid: string,
    }),
  }),
  navigation: shape({
    pop: func,
  }),
};
