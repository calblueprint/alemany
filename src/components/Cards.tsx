import React from 'react';

import { Tree } from '@types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { RowContainer, Pill } from 'src/components/Components';
import { FontAwesome } from '@expo/vector-icons';
import { Colors } from 'src/constants/Colors';
import { Body, Caption, Title, Regular } from 'src/components/Text';
import { Planted } from '@types';

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 20,
    backgroundColor: Colors.White,
  },
  row: {
    flexDirection: 'row',
  },
  hCenter: {
    alignItems: 'center',
  },
  pill: {
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.Grey100,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    backgroundColor: Colors.Grey300,
  },
});

type CardProps = {
  tree: Tree;
  onPress: () => void;
};

const plantedToString = (planted: Planted) => {
  if (planted == null) {
    return '';
  }
  const date = new Date(planted.seconds * 1000);
  return date.toUTCString().slice(5, 16);
};

export function Card(props: CardProps) {
  const { tree, onPress } = props;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <RowContainer style={{ justifyContent: 'space-between' }}>
        <View>
          <Title>{tree.name}</Title>
          <RowContainer style={[styles.hCenter, { marginTop: 9 }]}>
            <Body>#{tree.id} </Body>
            <Pill value="Peach" style={{ backgroundColor: '#ABCDEF' }} />
          </RowContainer>
          <RowContainer style={[styles.hCenter, { marginVertical: 16 }]}>
            <FontAwesome name="birthday-cake" style={{ marginRight: 4 }} />
            <Regular>{plantedToString(tree.planted)}</Regular>
          </RowContainer>

          <Caption>24 comments</Caption>
        </View>
        <View style={styles.image} />
      </RowContainer>
    </TouchableOpacity>
  );
}
