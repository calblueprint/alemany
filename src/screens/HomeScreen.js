import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from 'react';

import { func, shape, string } from 'prop-types';
import {
  View,
  Keyboard,
  TextInput,
  ScrollView,
  Dimensions,
} from 'react-native';

import Icon from '../components/Icon';
import Inset from '../components/Inset';
import SearchCard from '../components/SearchCard';
import ViewContainer from '../components/ViewContainer';
import ViewToggle from '../components/ViewToggle';
import { getAllTrees, checkID } from '../database/firebase';
import ListScreen from './ListScreen';
import MapScreen from './MapScreen';

function Search({ onQueryChange, query }) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        shadowColor: '#000000',
        shadowOpacity: 0.05,
        shadowOffset: {
          x: 0,
          y: 4,
        },
        shadowRadius: 7,
      }}
    >
      <Icon style={{ marginRight: 5 }} size={20} name="search" />
      <TextInput
        style={{
          fontSize: 18,
          flex: 1,
        }}
        placeholder="Search"
        value={query}
        onChangeText={onQueryChange}
      />
    </View>
  );
}
Search.propTypes = {
  onQueryChange: func,
  query: string,
};

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListView, setIsListView] = useState(false);
  const [trees, setTrees] = useState([]);
  const filtered = trees
    .filter(tree => tree !== null && tree.name && tree.id && checkID(tree.uuid))
    .filter(tree => {
      const query = searchQuery.toLowerCase();
      return (
        tree.name?.toLowerCase().includes(query) || tree.id.includes(query)
      );
    });
  const toggleView = useCallback(() => {
    setIsListView(!isListView);
  }, [isListView]);

  const isValidLocation = tree =>
    tree.location && tree.location.latitude && tree.location.longitude;

  useEffect(() => {
    async function getTrees() {
      try {
        const data = await getAllTrees();
        const validTrees = data.filter(tree => isValidLocation(tree));
        setTrees(validTrees);
      } catch (e) {
        console.warn(e);
      }
      const data = await getAllTrees();
      setTrees(data);
    }
    getTrees();
    const unsubscribe = navigation.addListener('focus', () => getTrees());
    return unsubscribe;
  }, [navigation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isListView ? 'List' : 'Map',
    });
    if (!isListView) {
      Keyboard.dismiss();
    }
  }, [navigation, isListView, toggleView]);

  const onSearchChange = searchValue => {
    setSearchQuery(searchValue);
    setIsListView(true);
  };

  const CARD_WIDTH = Dimensions.get('window').width * 0.8;
  return (
    <ViewContainer>
      <View style={{ position: 'relative', width: '100%', height: '100%' }}>
        <ListScreen
          data={filtered}
          navigation={navigation}
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: isListView ? 5 : 0,
          }}
        />
        <MapScreen
          data={filtered}
          navigation={navigation}
          style={{
            position: 'absolute',
            zIndex: 2,
          }}
        />
        <Inset style={{ marginTop: 48, position: 'absolute', zIndex: 100 }}>
          <Search onQueryChange={onSearchChange} query={searchQuery} />
          <ViewToggle setIsListView={setIsListView} isListView={isListView} />
          <View
            style={{
              alignItems: 'center',
              marginTop: 10,
              marginBottom: 248,
              justifyContent: 'space-between',
            }}
          >
            <ScrollView
              style={{
                width: '85%',
                height: '80%',
                backgroundColor: '#eee',
              }}
              horizontal
              pagingEnabled
              decelerationRate={0}
              snapToInterval={CARD_WIDTH + 10}
              snapToAlignment="center"
            >
              {filtered.map(tree => {
                const { uuid, name, comments } = tree;
                return (
                  <SearchCard
                    key={uuid}
                    name={name}
                    comments={comments}
                    onPress={() => navigation.push('TreeDetails', { uuid })}
                  />
                );
              })}
            </ScrollView>
          </View>
        </Inset>
      </View>
    </ViewContainer>
  );
}
HomeScreen.propTypes = {
  navigation: shape({
    navigate: func,
  }),
};
