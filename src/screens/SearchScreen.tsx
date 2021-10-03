import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import EditScreenInfo from 'components/EditScreenInfo';
import { Text, View } from 'components/Themed';
import { useEffect, useState } from 'react';
import { getAllTrees } from 'src/database/firebase';
import { Tree } from '@types';
import SearchCard from 'src/components/SearchCard';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [trees, setTrees] = React.useState<Tree[]>([]);
  useEffect(() => {
    async function getTrees() {
      let data = await getAllTrees();
      data = data.filter(
        (tree: Tree) => (tree.name || '').toLowerCase().includes(searchQuery) ||
          tree.id.includes(searchQuery),
      );
      setTrees(data);
    }
    getTrees();
  }, [searchQuery]);
  const onChangeSearch = (newQuery: string) => setSearchQuery(newQuery);
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}> Search Screen </Text>
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
    </View>
  );
}
