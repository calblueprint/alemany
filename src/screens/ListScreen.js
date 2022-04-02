import React from 'react';

import { array, func, shape } from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';

import Inset from '../components/Inset';
import SearchCard from '../components/SearchCard';

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
    paddingTop: 140,
  },
});

export default function ListScreen({ navigation, style, data }) {
  return (
    <ScrollView style={[styles.list, style]}>
      <Inset>
        <Text
          style={{
            fontSize: 11,
            color: '#3b3f51',
            marginTop: 48,
            textAlign: 'right',
          }}
        >
          {`${data.length} ${data.length === 1 ? 'result' : 'results'}`}
        </Text>
      </Inset>
      <View style={{ marginTop: 10, marginBottom: 248 }}>
        {data.map(tree => {
          const { uuid, name, comments } = tree;
          return (
            <SearchCard
              key={uuid}
              uuid="test_uuid"
              name={name}
              comments={comments}
              onPress={() => navigation.push('TreeDetails', { uuid })}
            />
          );
        })}
      </View>
    </ScrollView>
  );
}

ListScreen.propTypes = {
  navigation: shape({
    push: func,
  }),
  style: ViewPropTypes.style,
  // eslint-disable-next-line react/forbid-prop-types
  data: array,
};
