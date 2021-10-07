import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Title, Card, Paragraph } from 'react-native-paper';

import EditScreenInfo from 'components/EditScreenInfo';
import ViewContainer from 'components/ViewContainer';

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: '#eee',
  },
});

export default function AddScreen() {
  return (
    <ViewContainer>
      <Title>View Screen</Title>
      <View style={styles.separator} />
      <EditScreenInfo path="/screens/ViewScreen.tsx" />

      <Card>
        <Card.Title
          title="Card Title"
          subtitle="Card Subtitle"
          left={LeftContent}
        />
        <Card.Content>
          <Title>Card title</Title>
          <Paragraph>Card content</Paragraph>
        </Card.Content>
      </Card>
    </ViewContainer>
  );
}
