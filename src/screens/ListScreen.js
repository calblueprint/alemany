import React from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { array, bool, func, number, shape, string } from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  TouchableOpacity,
} from 'react-native';

import Inset from '../components/Inset';
import SearchCard from '../components/SearchCard';

const styles = StyleSheet.create({
  list: {
    width: '100%',
    height: '100%',
    backgroundColor: '#eee',
    paddingTop: 180,
  },
  button: {
    padding: '5px',
    backgroundColor: 'green',
    // width: '40%',
    height: 10,
  },
  buttonText: {
    fontSize: 11,
  },
});

const storeSearchStack = async value => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem('@storage_Key', jsonValue);
  } catch (e) {
    // saving error
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.removeItem('@storage_Key');
  } catch (e) {
    // error  value
  }
};

const SearchCardsComp = ({
  scroll,
  navigation,
  marginBottom,
  label,
  labelAlign,
}) => (
  <View>
    <Inset>
      <Text
        style={{
          fontSize: 15,
          color: '#3b3f51',
          marginTop: 10,
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
              navigation.push('TreeDetails', { uuid });
              if (scroll.length === 0) {
                scroll.unshift(tree);
              } else if (tree.name !== scroll[scroll.length - 1].name) {
                scroll.unshift(tree);
              }
              if (scroll.length > 4) {
                scroll.pop();
              }
              storeSearchStack(scroll);
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
  label: string,
  labelAlign: string,
};

export default function ListScreen({
  navigation,
  style,
  data,
  searchStack,
  searchQuery,
  searchEntered,
}) {
  // let scroll;
  let text;
  // let align;
  // if (searchQuery.length === 0) {
  //   align = 'left';
  //   if (searchStack.length === 0) {
  //     text = 'All trees';
  //     scroll = data;
  //   } else {
  //     text = 'Recents';
  //     scroll = searchStack;
  //   }
  // } else if (searchEntered === true) {
  //   align = 'right';
  //   scroll = data;
  //   text = `${scroll.length} ${scroll.length === 1 ? 'result' : 'results'}`;
  // } else {
  //   align = 'left';
  //   scroll = data;
  //   text = 'Suggestions';
  // }

  if (searchQuery.length === 0) {
    text = 'All trees';
  } else if (searchEntered === true) {
    text = `${data.length} ${data.length === 1 ? 'result' : 'results'}`;
  } else {
    text = 'Suggestions';
  }

  return (
    <ScrollView style={[styles.list, style]}>
      <View>
        {searchQuery.length === 0 && searchStack.length !== 0 ? (
          <SearchCardsComp
            scroll={searchStack}
            navigation={navigation}
            marginBottom={0}
            label="Recents"
            labelAlign="left"
          />
        ) : null}
      </View>
      {/* <TouchableOpacity onPress={clearStorage}>
        <Text>Clear Recents</Text>
      </TouchableOpacity> */}
      <View>
        <SearchCardsComp
          scroll={data}
          navigation={navigation}
          marginBottom={260}
          label={text}
          labelAlign={searchEntered === true ? 'right' : 'left'}
        />
      </View>
      {/* <Inset>
        <Text
          style={{
            fontSize: 15,
            color: '#3b3f51',
            marginTop: 10,
            textAlign: `${align}`,
          }}
        >
          {text}
        </Text>
        <TouchableOpacity onPress={clearStorage}>
          <Text>Clear Recents</Text>
        </TouchableOpacity>
      </Inset>
      <View style={{ marginTop: 10, marginBottom: 260 }}>
        {scroll.map(tree => {
          const { uuid, name, comments } = tree;
          return (
            <SearchCard
              key={uuid}
              name={name}
              comments={comments}
              onPress={() => {
                navigation.push('TreeDetails', { uuid });
                if (searchStack.length === 0) {
                  searchStack.unshift(tree);
                } else if (
                  tree.name !== searchStack[searchStack.length - 1].name
                ) {
                  searchStack.unshift(tree);
                }
                if (searchStack.length > 4) {
                  searchStack.pop();
                }
                storeSearchStack(searchStack);
              }}
            />
          );
        })}
      </View> */}
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
