import React from 'react';

import { Card } from 'react-native-paper';

import { Tree } from '@types';

type SearchCardProps = {
  name: Tree['name'];
  id: Tree['id'];
  onPress: () => void;
};

export default function SearchCard(props: SearchCardProps) {
  const { name, id, onPress } = props;
  return (
    <Card style={{ height: 100 }} onPress={onPress}>
      <Card.Title title={name} subtitle={id} />
    </Card>
  );
}
