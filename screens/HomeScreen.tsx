import { Header } from '@/components/Header/Header';
import { Search } from '@/components/Search/Search';
import { COLORS } from '@/constans/ui';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchPokemonList } from '../redux/pokemonSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const screenWidth = Dimensions.get('window').width;

export default function HomeScreen({ navigation }: Props) {
  const dispatch = useAppDispatch();
  const { list, loadingList, errorList } = useAppSelector(
    (state) => state.pokemon
  );
  const [searchText, setSearchText] = useState('');

  const getPokemonIdFromUrl = (url: string) => {
    const match = url.match(/\/pokemon\/(\d+)\//);
    return match ? match[1] : '1';
  };

  useEffect(() => {
    dispatch(fetchPokemonList());
  }, [dispatch]);

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loadingList) {
    return (
      <View style={styles.message}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorList) {
    return (
      <View style={styles.message}>
        <Text>{errorList}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Search onSearchChange={setSearchText} />
      <View style={styles.wrapper}>
        {filteredList.length === 0 && searchText !== '' ? (
          <Text style={styles.searchMessage}>
            There is no Pokemon with this name. Please try again!
          </Text>
        ) : (
          <FlatList
            data={filteredList}
            keyExtractor={(item) => item.name}
            contentContainerStyle={{ paddingBottom: 120 }}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('PokemonCard', { url: item.url })
                }
                style={styles.item}
              >
                <ImageBackground
                  style={styles.img}
                  source={{
                    uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonIdFromUrl(
                      item.url
                    )}.png`,
                  }}
                />
                <Text style={styles.name}>
                  {' '}
                  {index + 1}. {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE_COLOR,
  },

  wrapper: {
    width: screenWidth,
    padding: 15,
  },

  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 10,
    backgroundColor: COLORS.WHITE_COLOR,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  name: {
    fontSize: 16,
    fontWeight: '500',
  },

  img: {
    width: 100,
    height: 80,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  message: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchMessage: {
    textAlign: 'center',
    color: 'red',
  },
});
