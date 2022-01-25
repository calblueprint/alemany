import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { ScrollView, SafeAreaView } from 'react-native';
import { Searchbar, Title } from 'react-native-paper';

import { Tree, RootTabScreenProps } from '@types';
import SearchCard from 'src/components/SearchCard';
import ViewContainer from 'src/components/ViewContainer';
import { getAllTrees, checkID } from 'src/database/firebase';
import { ScrollContainer, TopContainer } from 'src/components/Components';
import { Card } from 'src/components/Cards';
import { SearchBar } from 'src/components/Inputs';

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
    <SafeAreaView>
      <TopContainer>
        <SearchBar
          style={{ minWidth: '100%' }}
          placeholder="Search"
          onChangeText={onSearchChange}
          value={searchQuery}
        />
      </TopContainer>
      <ScrollContainer>
        {filtered.map((tree: Tree) => {
          const uuid = tree.uuid;
          return (
            <Card
              tree={tree}
              onPress={() => navigation.push('TreeDetails', { uuid })}
            />
          );
        })}
      </ScrollContainer>
    </SafeAreaView>
  );
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape({
    push: PropTypes.func.isRequired,
    addListener: PropTypes.func.isRequired,
  }).isRequired,
};
