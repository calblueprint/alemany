import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Text, Card, Paragraph } from 'react-native-paper';

import ViewContainer from 'components/ViewContainer';
import { getAllTrees } from 'database/firebase';

import { Tree } from '@types';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function TreeScreen() {
  const [allTrees, setAllTrees] = React.useState<Tree[]>([]);
  React.useEffect(() => {
    async function getData() {
      const trees = await getAllTrees();
      setAllTrees(trees);
    }
    getData();
  }, []);

  return (
    <ViewContainer>
      <Title>Tree Screen</Title>
      <View style={styles.separator} />
      <Card>
        {/* <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        /> */}
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>{allTrees.length.toString()}</Paragraph>
        </Card.Content>
      </Card>

      <Card>
        {/* <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        /> */}
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>{allTrees[0].name}</Paragraph>
        </Card.Content>
      </Card>
    </ViewContainer>
  );
}
