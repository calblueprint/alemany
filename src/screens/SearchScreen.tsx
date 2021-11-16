import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Searchbar, Title } from 'react-native-paper';

import { Tree, RootTabScreenProps } from '@types';
import SearchCard from 'src/components/SearchCard';
import { ViewContainer } from 'src/components/Components';
import { getAllTrees, checkID } from 'src/database/firebase';

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<'Search'>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [trees, setTrees] = useState<Tree[]>([]);
  const filtered = trees
    .filter(
      (tree: Tree) =>
        tree !== null && tree.name && tree.id && checkID(tree.uuid),
    )
    .filter((tree: Tree) => {
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

  const onSearchChange = (searchValue: string) => {
    setSearchQuery(searchValue);
  };

  return (
    <ViewContainer>
      <Searchbar
        style={{ minWidth: '100%', marginBottom: 10, shadowColor: 'white' }}
        placeholder="Search"
        onChangeText={onSearchChange}
        value={searchQuery}
      />

      <ScrollView style={{ minWidth: '100%' }}>
        {searchQuery === '' ? <Title>All Trees</Title> : <Title>Results</Title>}

        {filtered.map((tree: Tree) => {
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
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};
