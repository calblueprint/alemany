import React, { useEffect, useState } from 'react';

import { arrayOf, func, node, object, string } from 'prop-types';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewPropTypes,
  Image,
} from 'react-native';

import firebase from '../database/firebase';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 30,
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  meta: {
    marginTop: 10,
    fontSize: 14,
    color: '#333',
  },
});

function Card({ onPress, children, style }) {
  return (
    <Pressable style={[styles.card, style]} onPress={onPress}>
      {children}
    </Pressable>
  );
}
Card.propTypes = {
  onPress: func,
  children: node,
  style: ViewPropTypes.style,
};

export default function SearchCard({ name, onPress, comments, uuid }) {
  const [imageURL, setImageURL] = useState(null);
  useEffect(() => {
    async function fetchImageURL() {
      const httpsReference = await firebase
        .storage()
        .ref(uuid)
        .getDownloadURL();
      setImageURL(httpsReference);
    }
    fetchImageURL();
  }, [uuid]);
  return (
    <Card
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
      onPress={onPress}
    >
      <View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.meta}>
          {`${comments?.length || 0} comment`}
          {comments?.length !== 1 && 's'}
        </Text>
      </View>
      <Image
        source={{ uri: imageURL }}
        style={{
          height: 96,
          width: 96,
          backgroundColor: '#aaa',
          borderRadius: 8,
        }}
      />
    </Card>
  );
}
SearchCard.propTypes = {
  name: string,
  // eslint-disable-next-line react/forbid-prop-types
  comments: arrayOf(object),
  onPress: func,
  uuid: string,
};
