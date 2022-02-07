import React, { useEffect, useState } from 'react';

import { func, shape } from 'prop-types';
import { ScrollView, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';

import Inset from '../components/Inset';
import SearchCard from '../components/SearchCard';
import ViewContainer from '../components/ViewContainer';
import { getAllTrees, checkID } from '../database/firebase';

export default function SearchScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [trees, setTrees] = useState([]);
  const filtered = trees
    .filter(tree => tree !== null && tree.name && tree.id && checkID(tree.uuid))
    .filter(tree => {
      const query = searchQuery.toLowerCase();
      return (
        tree.name?.toLowerCase().includes(query) || tree.id.includes(query)
      );
    });
  useEffect(() => {
    async function getTrees() {
      const data = await getAllTrees();
      setTrees(data);
    }
    getTrees();
    const unsubscribe = navigation.addListener('focus', () => getTrees());
    return unsubscribe;
  }, [navigation]);

  const onSearchChange = searchValue => {
    setSearchQuery(searchValue);
  };

  return (
    <ViewContainer topPadding>
      <ScrollView>
        <Inset
          style={{
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              fontSize: 30,
              fontWeight: 'bold',
            }}
          >
            Search
          </Text>
        </Inset>
        <Searchbar
          style={{ minWidth: '100%', shadowOpacity: 0 }}
          placeholder="Search"
          onChangeText={onSearchChange}
          value={searchQuery}
          autoComplete={undefined}
        />
        <Inset>
          {filtered.map(tree => {
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
        </Inset>
      </ScrollView>
    </ViewContainer>
  );
}

SearchScreen.propTypes = {
  navigation: shape({
    push: func,
  }),
};
