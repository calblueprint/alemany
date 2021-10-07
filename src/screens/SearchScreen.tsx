import React, { useEffect, useState } from 'react';

import { ScrollView } from 'react-native';
import { Searchbar, Title } from 'react-native-paper';

import { Tree } from '@types';
import SearchCard from 'src/components/SearchCard';
import ViewContainer from 'src/components/ViewContainer';
import { getAllTrees } from 'src/database/firebase';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trees, setTrees] = useState<Tree[]>([]);
  const filtered = trees
    .filter((tree: Tree) => tree !== null && tree.name && tree.id)
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
  }, []);

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
        />
        {filtered.map((tree: Tree) => (
          <SearchCard key={tree.id} name={tree.name} id={tree.id} />
        ))}
      </ScrollView>
    </ViewContainer>
  );
}
