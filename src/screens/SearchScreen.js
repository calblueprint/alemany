import React, { useEffect, useState } from 'react';

import { func, objectOf } from 'prop-types';
import { ScrollView } from 'react-native';
import { Searchbar, Title } from 'react-native-paper';

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
    <ViewContainer>
      <ScrollView>
        <Title> Search Screen </Title>
        <Searchbar
          style={{ minWidth: '100%' }}
          placeholder="Search"
          onChangeText={onSearchChange}
          value={searchQuery}
          autoComplete={undefined}
        />
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
      </ScrollView>
    </ViewContainer>
  );
}

SearchScreen.propTypes = {
  navigation: objectOf({
    push: func,
  }),
};
