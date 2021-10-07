import React from 'react';
import { Tree } from '@types';
import { Card } from 'react-native-paper';

type SearchCardProps = {
  name: Tree['name'];
  id: Tree['id'];
};

export default function SearchCard(props: SearchCardProps) {
  const { name, id } = props;
  return (
    <Card style={{ height: 100 }}>
      <Card.Title title={name} subtitle={id} />
    </Card>
  );
}
