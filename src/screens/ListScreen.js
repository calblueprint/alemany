import React from 'react';

import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { arrayOf, func, shape } from 'prop-types';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
} from 'react-native';

import Inset from '../components/Inset';
import SearchCard from '../components/SearchCard';
import Tree from '../customprops';

export default function ListScreen({ navigation, style, data }) {
  return (
    <BottomSheetScrollView style={style}>
      <Inset>
        <Text
          style={{
            fontSize: 11,
            color: '#3b3f51',
            textAlign: 'right',
          }}
        >
          {`${data.length} ${data.length === 1 ? 'result' : 'results'}`}
        </Text>
      </Inset>
      <View style={{ marginTop: 10, marginBottom: 248 }}>
        {data.map(tree => {
          const { uuid, name, comments, images } = tree;
          return (
            <SearchCard
              key={uuid}
              uuid={uuid}
              previewImage={images && images[0]}
              name={name}
              comments={comments}
              onPress={() => navigation.push('TreeScreen', { uuid })}
            />
          );
        })}
      </View>
    </BottomSheetScrollView>
  );
}

ListScreen.propTypes = {
  navigation: shape({
    push: func,
  }),
  style: ViewPropTypes.style,
  data: arrayOf(Tree),
};
