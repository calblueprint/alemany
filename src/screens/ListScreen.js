import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { array, bool, func, number, shape, string } from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  alert,
} from 'react-native';

import Inset from '../components/Inset';
import SearchCard from '../components/SearchCard';
import { color } from '../components/ui/colors';

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
    backgroundColor: color('gray.50'),
    paddingTop: 140,
  },
});

const storeSearchStack = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
  } catch (e) {
    alert('Could not store searchStack');
  }
};

const SearchCardsComp = ({
  scroll,
  navigation,
  marginBottom,
  marginTop,
  label,
  labelAlign,
  searchStack,
}) => (
  <View>
    <Inset>
      <Text
        style={{
          fontSize: 15,
          color: '#3b3f51',
          marginTop,
          textAlign: labelAlign,
        }}
      >
        {label}
      </Text>
    </Inset>
    <View style={{ marginTop: 10, marginBottom }}>
      {scroll.map(tree => {
        const { uuid, name, comments } = tree;
        return (
          <SearchCard
            key={uuid}
            name={name}
            comments={comments}
            onPress={() => {
              navigation.push('TreeScreen', { uuid });
              if (searchStack?.filter(e => e.uuid === tree.uuid).length > 0) {
                const foundInd = searchStack.findIndex(
                  el => el.uuid === tree.uuid,
                );
                searchStack.splice(foundInd, 1);
              }
              searchStack.unshift(tree);
              if (searchStack.length > 5) {
                searchStack.pop();
              }
              storeSearchStack(searchStack);
              // }
            }}
          />
        );
      })}
    </View>
  </View>
);

SearchCardsComp.propTypes = {
  scroll: shape({
    push: func,
  }),
  navigation: shape({
    push: func,
  }),
  marginBottom: number,
  marginTop: number,
  label: string,
  labelAlign: string,
  // eslint-disable-next-line react/forbid-prop-types
  searchStack: array,
};

export default function ListScreen({
  navigation,
  style,
  data,
  searchStack,
  searchQuery,
  searchEntered,
}) {
  let text;
  if (searchQuery.length === 0) {
    text = 'All trees';
  } else if (searchEntered === true) {
    text = `${data.length} ${data.length === 1 ? 'result' : 'results'}`;
  } else if (data.length === 0) {
    text = 'No matches found for your search. Try again!';
  } else {
    text = 'Suggestions';
  }
  return (
    <ScrollView style={[styles.list, style]}>
      <View>
        {searchQuery.length === 0 && searchStack.length !== 0 ? (
          <SearchCardsComp
            scroll={searchStack}
            searchStack={searchStack}
            navigation={navigation}
            marginBottom={0}
            marginTop={50}
            label="Recents"
            labelAlign="left"
          />
        ) : null}
      </View>
      <View>
        <SearchCardsComp
          scroll={data}
          searchStack={searchStack}
          navigation={navigation}
          marginBottom={140}
          marginTop={10}
          label={text}
          labelAlign={searchEntered === true ? 'right' : 'left'}
        />
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
