import React from 'react';
import { Provider } from 'react-redux';
import Navigation from '../navigation';
import { store } from '../redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

// import { getFetchAction } from '@/api';
// import { Search } from '@/components/Search/Search';
// import { COLORS } from '@/constans/ui';
// import { Header } from '@/components/Header/Header';
// import { PokemonList } from '@/components/PokemonList/PokemonList';
// import { PokemonListItem, PokemonListResponse } from '@/types/pokemon';
// import { useEffect, useState } from 'react';
// import { SafeAreaView, StyleSheet } from 'react-native';

// export default function HomeScreen() {
//   const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [offset, setOffset] = useState(0);
//   const [hasMore, setHasMore] = useState(true);

//   const getPokemonList = async () => {
//     const limit = 20;

//     if (loading || !hasMore) return;

//     const remaining = 151 - pokemonList.length;
//     const adjustedLimit = Math.min(limit, remaining);

//     try {
//       setLoading(true);
//       const response: PokemonListResponse = await getFetchAction(
//         {},
//         `pokemon?offset=${offset}&limit=${adjustedLimit}`
//       );

//       setPokemonList((prev) => [...prev, ...response.results]);
//       setOffset((prev) => prev + adjustedLimit);

//       if (pokemonList.length + adjustedLimit >= 151) {
//         setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Failed to fetch pokemon list:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getPokemonList(0);
//   }, []);

//   const loadMore = () => {
//     getPokemonList();
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Header />
//       <Search />
//       <PokemonList
//         data={pokemonList}
//         onEndReached={loadMore}
//         loading={loading}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     backgroundColor: COLORS.WHITE_COLOR,
//   },
//   item: {
//     padding: 12,
//     backgroundColor: COLORS.CARD_BGR_COLOR,
//     borderRadius: 8,
//     marginBottom: 10,
//   },
//   name: {
//     fontSize: 16,
//     fontWeight: '500',
//   },
// });
