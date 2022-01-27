import React, { useEffect, useState } from 'react';

import { ScrollView } from 'react-native';
import { Searchbar, Title } from 'react-native-paper';

import { Tree, RootTabScreenProps } from '@types';
import SearchCard from 'components/SearchCard';
import ViewContainer from 'components/ViewContainer';
import { getAllTrees, checkID } from 'database/firebase';

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
      <ScrollView>
        <Title> Search Screen </Title>
        <Searchbar
          style={{ minWidth: '100%' }}
          placeholder="Search"
          onChangeText={onSearchChange}
          value={searchQuery}
          autoComplete={undefined}
        />
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
