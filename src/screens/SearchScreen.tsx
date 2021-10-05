import * as React from 'react';
import { ScrollView } from 'react-native';

import EditScreenInfo from 'components/EditScreenInfo';
import { useEffect, useState } from 'react';
import { getAllTrees } from 'src/database/firebase';
import { Tree } from '@types';
import SearchCard from 'src/components/SearchCard';
import { Searchbar, Title } from 'react-native-paper';
import ViewContainer from 'src/components/ViewContainer';

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTrees, setFilteredTrees] = useState<Tree[]>([]);
  const [trees, setTrees] = useState<Tree[]>([]);
  useEffect(() => {
    async function getTrees() {
      const data = await getAllTrees();
      setTrees(data);
      setFilteredTrees(data);
    }
    getTrees();
  }, []);

  const onSearchChange = (searchValue: string) => {
    setSearchQuery(searchValue);
    // Checking searchValue because searchQuery isn't set instantaneously
    if (searchValue !== '') {
      const newFilteredTrees = trees.filter(
        (tree: Tree) => (tree.name || '').toLowerCase().includes(searchQuery) ||
          (tree.id && tree.id.includes(searchQuery)),
      );
      setFilteredTrees(newFilteredTrees);
    } else {
      setFilteredTrees(trees);
    }
  };
  return (
    <ViewContainer>
      <ScrollView>
        <Title> Search Screen </Title>
        <Searchbar
          placeholder="Search"
          onChangeText={onSearchChange}
          value={searchQuery}
        />
        {filteredTrees.map((tree: Tree) => (
          <SearchCard key={tree.id} treeName={tree.name} treeID={tree.id} />
        ))}
        <EditScreenInfo path="/screens/TreeScreen.tsx" />
      </ScrollView>
    </ViewContainer>
  );
}
