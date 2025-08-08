import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';

const countries = ["Canada", "China", "India", "Japan", "Germany", "France"];

const AutoCompleteExample = () => {
  const [query, setQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      const suggestions = countries.filter(item =>
        item.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredData(suggestions);
    } else {
      setFilteredData([]);
    }
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        data={filteredData}
        defaultValue={query}
        onChangeText={handleSearch}
        placeholder="Enter a country"
        flatListProps={{
          keyExtractor: (_, idx) => idx.toString(),
          renderItem: ({ item }) => (
            <TouchableOpacity onPress={() => setQuery(item)}>
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          ),
        }}
        inputContainerStyle={styles.inputContainer}
        listContainerStyle={styles.listContainer}
        // listStyle={styles.list}
      />

      {/* Other Content */}
     
    </View>
  );
};

export default AutoCompleteExample;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  inputContainer: {
    borderWidth: 0,
    zIndex: 1, // Ensures input stays on top
  },
  listContainer: {
    position: 'absolute', // Positions the dropdown absolutely
    top: 40,              // Adjust according to input height
    zIndex: 999,          // High zIndex to stay on top
    width: '100%',
  },
  list: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    position: "absolute",

    maxHeight: 150,
    ...Platform.select({
      android: {
        elevation: 5, // Android shadow
      },
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  itemText: {
    padding: 10,
    fontSize: 16,
  },
  otherContent: {
    marginTop: 100,
  },
});
