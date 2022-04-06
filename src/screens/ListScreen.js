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
  {
    if (searchQuery.length === 0) {
      scroll = searchStack;
      if (searchStack.length === 0) {
        text = 'Try searching for something!';
        // When no previous searches: show full list of cards w/ no text"
      } else {
        text = 'Recents';
      }
    } else if (searchEntered) {
      text = 'X results';
    } else {
      scroll = data;
      text = 'Suggestions';
      // Should switch to results text when enter is hit
    }
  }
  return (
    <ScrollView style={[styles.list, style]}>
      <Inset>
        {/* <Text
          style={{
            fontSize: 11,
            color: '#3b3f51',
            marginTop: 48,
            textAlign: 'right',
          }}
        >
          {`${scroll.length} ${scroll.length === 1 ? 'result' : 'results'}`}
          Results counter should only appear when enter button is hit
        </Text> */}
        <Text
          style={{
            fontSize: 15,
            color: '#353535',
            marginTop: 5,
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
                searchStack.unshift(tree);
                if (searchStack.length > 5) {
                  searchStack.pop();
                }
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
