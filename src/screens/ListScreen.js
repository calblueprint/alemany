import React from 'react';

import { array, func, shape } from 'prop-types';
import { ScrollView, StyleSheet, ViewPropTypes } from 'react-native';

import SearchCard from '../components/SearchCard';

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingTop: 140,
  },
});

export default function ListScreen({ navigation, style, data }) {
  return (
    <ScrollView style={[styles.list, style]}>
      {data.map(tree => {
        const { uuid, name, id } = tree;
        return (
          <SearchCard
            key={uuid}
            name={name}
            id={id}
            onPress={() => navigation.push('TreeDetails', { uuid })}
          />
        );
      })}
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
