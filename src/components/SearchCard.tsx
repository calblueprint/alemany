import React from 'react';

import { Card } from 'react-native-paper';

export default function SearchCard({
  treeName,
  treeID,
}: {
  treeName: string | null;
  treeID: string;
}) {
  return (
    <Card style={{ height: 100 }}>
      <Card.Title title={treeName} subtitle={treeID} />
    </Card>
  );
}
