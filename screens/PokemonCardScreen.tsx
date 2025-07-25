import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { RootStackParamList } from '../navigation/types';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchPokemonByUrl } from '../redux/pokemonSlice';

type Props = NativeStackScreenProps<RootStackParamList, 'PokemonCard'>;

export default function PokemonCardScreen({ route }: Props) {
  const { url } = route.params;
  const dispatch = useAppDispatch();
  const { selected, loadingSelected, errorSelected } = useAppSelector(
    (state) => state.pokemon
  );

  useEffect(() => {
    dispatch(fetchPokemonByUrl(url));
  }, [dispatch, url]);

  if (loadingSelected) {
    return (
      <View style={styles.message}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (errorSelected) {
    return (
      <View style={styles.message}>
        <Text>{errorSelected}</Text>
      </View>
    );
  }

  if (!selected) {
    return null;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.header}>
        {selected.sprites?.front_default && (
          <View style={styles.imageWrapper}>
            <Image
              source={{ uri: selected.sprites.front_default }}
              style={styles.image}
              resizeMode="contain"
            />
          </View>
        )}

        <View style={styles.infoBlock}>
          <Text style={styles.name}>{selected.name}</Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>ID:</Text> {selected.id}
          </Text>
          <Text style={styles.infoText}>
            <Text style={styles.label}>Types:</Text>{' '}
            {selected.types.map((t) => t.type.name).join(', ')}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Height:</Text> {selected.height}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Weight:</Text> {selected.weight}
        </Text>
        <Text style={styles.infoText}>
          <Text style={styles.label}>Base Experience:</Text>{' '}
          {selected.base_experience}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stats:</Text>
        {selected.stats.map((stat) => (
          <Text key={stat.stat.name} style={styles.statText}>
            {stat.stat.name.toUpperCase()}: {stat.base_stat}
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 24,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    gap: 24,
  },

  imageWrapper: {
    backgroundColor: '#cdb8f0',
    borderRadius: 16,
    shadowColor: '#8e95e3',
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
    padding: 8,
  },

  image: {
    width: 100,
    height: 100,
  },

  infoBlock: {
    flex: 1,
    gap: 12,
  },

  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },

  infoText: {
    fontSize: 18,
    textTransform: 'capitalize',
    lineHeight: 24,
  },

  label: {
    fontWeight: 'bold',
  },

  section: {
    marginBottom: 24,
    gap: 8,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  statText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
