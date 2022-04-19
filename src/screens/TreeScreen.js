import React from 'react';

import { shape, string } from 'prop-types';

import Tree from '../components/Tree';
import { setTree } from '../database/firebase';

export default function TreeScreen({ route }) {
  const { uuid } = route.params;
  const handleSave = async tree => {
    setTree(tree);
  };
  return <Tree onSave={handleSave} uuid={uuid} />;
}

TreeScreen.propTypes = {
  route: shape({
    params: shape({
      uuid: string,
    }),
  }),
};
