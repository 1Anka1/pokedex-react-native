import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface SearchProps {
  onSearchChange: (text: string) => void;
}

export const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          onChangeText={onSearchChange}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 10,
    width: '100%',
    alignItems: 'center',
  },

  input: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    width: '80%',
  },
});
