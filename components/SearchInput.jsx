import { useState } from "react";
import { View, TouchableOpacity, Image, TextInput, Alert } from "react-native";
import { icons } from "../constants";

const SearchInput = ({ query, setQuery, onSearch }) => {
  const [inputText, setInputText] = useState(query); // Local state for text input

  const handleSearch = () => {
    console.log("Search button pressed with query:", inputText); // Log when search button is pressed
    console.log("Calling onSearch with inputText:", inputText); // Log before triggering search
    setQuery(inputText); // Update the query state
    onSearch(inputText); // Trigger the search in parent component
  };

  return (
    <View className="flex flex-row items-center space-x-4 w-full h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary">
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={inputText} // Bind to local inputText state
        placeholder="Search for an activity topic"
        placeholderTextColor="#CDCDE0"
        onChangeText={(text) => {
          console.log("Text changed:", text); // Log when text is typed
          setInputText(text); // Update inputText state without changing the query
        }}
      />

      <TouchableOpacity onPress={handleSearch}>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
