import { Title } from '@/components/Title/Title';
import { Platform, StyleSheet, View } from 'react-native';

export const Header = () => {
  return (
    <View style={styles.container}>
      <Title>Pokédex</Title>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 20 : 0,
    paddingBottom: 15,
  },
});
