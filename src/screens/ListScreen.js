/* eslint-disable no-lone-blocks */
import React from 'react';

import { array, bool, func, shape, string } from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';

import Inset from '../components/Inset';
import SearchCard from '../components/SearchCard';
// eslint-disable-next-line import/no-cycle
import editSearchHistory from './HomeScreen';

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
    paddingTop: 140,
  },
});

export default function ListScreen({
  navigation,
  style,
  data,
  searchStack,
  searchQuery,
  searchEntered,
}) {
  let scroll;
  let text;
  let align;
  {
    if (searchQuery.length === 0) {
      align = 'left';
      if (searchStack.length === 0) {
        text = '';
        // When no previous searches: show full list of cards w/ no text"
        scroll = data;
      } else {
        text = 'Recents';
        scroll = searchStack;
      }
    } else if (searchEntered === true) {
      align = 'right';
      scroll = data;
      text = `${scroll.length} ${scroll.length === 1 ? 'result' : 'results'}`;
    } else {
      align = 'left';
      scroll = data;
      text = 'Suggestions';
      // Should switch to results text when enter is hit
    }
  }
  return (
    <ScrollView style={[styles.list, style]}>
      <Inset>
        <Text
          style={{
            fontSize: 15,
            color: '#3b3f51',
            marginTop: 48,
            textAlign: `${align}`,
          }}
        >
          {text}
        </Text>
      </Inset>
      <View style={{ marginTop: 10, marginBottom: 248 }}>
        {scroll.map(tree => {
          const { uuid, name, comments } = tree;
          return (
            <SearchCard
              key={uuid}
              name={name}
              comments={comments}
              onPress={() => {
                navigation.push('TreeDetails', { uuid });
                editSearchHistory(tree);
              }}
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
  searchStack: shape({
    push: func,
  }),
  searchQuery: string,
  searchEntered: bool,
};
