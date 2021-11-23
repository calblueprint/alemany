import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { ScrollView } from 'react-native';
import { Button, Searchbar, Title } from 'react-native-paper';

import { Tree, RootTabScreenProps } from '@types';
import SearchCard from 'src/components/SearchCard';
import ViewContainer from 'src/components/ViewContainer';
import { getAllTrees, getActiveTrees, checkID } from 'src/database/firebase';

export default function SearchScreen({
  navigation,
}: RootTabScreenProps<'Search'>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [trees, setTrees] = useState<Tree[]>([]);
  const [active, setActive] = useState<boolean>(true);

  let filtered = trees
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
    refreshTrees();
    const unsubscribe = navigation.addListener('focus', () => refreshTrees());
    return unsubscribe;
  }, [navigation]);

  const refreshTrees = () => {
    async function getTrees() {
      let data = [];
      if (active) {
        data = await getActiveTrees();
      } else {
        data = await getAllTrees();
      }
      setTrees(data);
    }
    getTrees();
  };

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
        <Button
          onPress={() => {
            setActive(!active);
            refreshTrees();
          }}
        >
          {!active ? 'Show All Trees' : 'Show Active Trees'}
        </Button>
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
