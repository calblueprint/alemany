import React from 'react';
import { Text, View } from 'react-native';

import { Card } from 'react-native-paper';

import { Tree } from '@types';

type SearchCardProps = {
  name: Tree['name'];
  id: Tree['id'];
  onPress: () => void;
};

var stringToColour = function (str: string) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
};

var placeToColour = function (str: string) {
  if (str === 'Upper Hillside') {
    return 'coral';
  }
  if (str === 'Lower Hillside') {
    return 'aquamarine';
  }
  return 'pink';
};

const places = ['Upper Hillside', 'Lower Hillside', 'Lower Orchard'];
export default function SearchCard(props: SearchCardProps) {
  const { name, id, onPress } = props;
  const tag = name?.split(' ')[1];
  const place = places[Math.floor(Math.random() * 3)];

  return (
    <Card style={{ marginBottom: 10, shadowColor: 'white' }} onPress={onPress}>
      <Card.Title title={name} subtitle={id} />
      <Card.Content style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View
          style={{
            flex: 0,
            backgroundColor: stringToColour(tag),
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 20,
            marginRight: 5,
          }}
        >
          <Text>{tag}</Text>
        </View>
        <View
          style={{
            flex: 0,
            backgroundColor: placeToColour(place),
            padding: 5,
            paddingHorizontal: 10,
            borderRadius: 20,
          }}
        >
          <Text>{place}</Text>
        </View>
      </Card.Content>
    </Card>
  );
}
