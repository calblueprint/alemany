import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { bool, func, shape, string } from 'prop-types';
import { View, Keyboard, TextInput } from 'react-native';

import Icon from '../components/Icon';
import Inset from '../components/Inset';
import ViewContainer from '../components/ViewContainer';
import ViewToggle from '../components/ViewToggle';
import { getAllTrees, checkID } from '../database/firebase';
import ListScreen from './ListScreen';
import MapScreen from './MapScreen';

function Search({ onQueryChange, query, onSubmitSearch }) {
  return (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        display: 'flex',
        flexWrap: 'wrap',
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
      contentContainerStyle={{ flexWrap: 'wrap' }}
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
        onSubmitEditing={onSubmitSearch}
      />
    </View>
  );
}
Search.propTypes = {
  onQueryChange: func,
  query: string,
  onSubmitSearch: bool,
};

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isListView, setIsListView] = useState(false);
  const [trees, setTrees] = useState([]);
  const [searchStack, setSearchStack] = useState([]);
  const [searchEntered, setEnter] = useState(false);

  const suggestedSearch = (query, first, second) => {
    if (first.slice(0, query.length) === query) {
      if (second.slice(0, query.length) === query) {
        if (first < second) return -1;
        if (first > second) return 1;
        return 0;
      }
      return -1;
    }
    if (second.slice(0, query.length) === query) {
      return 1;
    }
    if (first < second) return -1;
    if (first > second) return 1;
    return 0;
  };

  const filtered = trees
    .filter(tree => tree !== null && tree.name && tree.id && checkID(tree.uuid))
    .filter(tree => {
      const query = searchQuery.toLowerCase();
      return (
        tree.name?.toLowerCase().includes(query) || tree.id.includes(query)
      );
    })
    .sort((a, b) => {
      const query = searchQuery.toLowerCase();
      const firstN = a.name.toLowerCase();
      const secondN = b.name.toLowerCase();
      const firstId = a.id.toLowerCase();
      const secondId = b.id.toLowerCase();
      if (parseInt(query, 10)) {
        return suggestedSearch(query, firstId, secondId);
      }
      return suggestedSearch(query, firstN, secondN);
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
    }
    return navigation.addListener('focus', () => getTrees());
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
    setEnter(false);
  };

  const storeSearchStack = async value => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem('@storage_Key', jsonValue);
    } catch (e) {}
  };

  const getSearchStack = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key');
      jsonValue != null
        ? setSearchStack(JSON.parse(jsonValue))
        : setSearchStack([]);
    } catch (e) {}
  };

  useEffect(() => {
    getSearchStack();
  }, []);

  const editSearchHistory = newSearch => {
    if (searchStack.filter(e => e.uuid === newSearch.uuid).length > 0) {
      const foundInd = searchStack.findIndex(el => el.uuid === newSearch.uuid);
      searchStack.splice(foundInd, 1);
    }
    searchStack.unshift(newSearch);
    if (searchStack.length > 5) {
      searchStack.pop();
    }
    storeSearchStack(searchStack);
  };

  const submitSearch = () => {
    if (filtered.length !== 0) {
      editSearchHistory(filtered[0]);
    }
    setEnter(true);
  };

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
          searchStack={searchStack}
          searchQuery={searchQuery}
          searchEntered={searchEntered}
        />
        <MapScreen
          data={filtered}
          navigation={navigation}
          isList={isListView}
          style={{
            position: 'absolute',
            zIndex: 2,
          }}
        />
        <Inset style={{ marginTop: 48, position: 'absolute', zIndex: 100 }}>
          <Search
            onQueryChange={onSearchChange}
            query={searchQuery}
            onSubmitSearch={submitSearch}
          />
          <ViewToggle setIsListView={setIsListView} isListView={isListView} />
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
