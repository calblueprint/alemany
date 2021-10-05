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
  const [trees, setTrees] = React.useState<Tree[]>([]);
  useEffect(() => {
    async function getTrees() {
      let data = await getAllTrees();
      data = data.filter(
        (tree: Tree) => (tree.name || '').toLowerCase().includes(searchQuery) ||
          (tree.id && tree.id.includes(searchQuery)),
      );
      setTrees(data);
    }
    getTrees();
  }, [searchQuery]);
  const onChangeSearch = (newQuery: string) => setSearchQuery(newQuery);
  return (
    <ViewContainer>
      <ScrollView>
        <Title> Search Screen </Title>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        {trees.map((tree: Tree) => (
          <SearchCard key={tree.id} treeName={tree.name} treeID={tree.id} />
        ))}
        <EditScreenInfo path="/screens/TreeScreen.tsx" />
      </ScrollView>
    </ViewContainer>
  );
}
