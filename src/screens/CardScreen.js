import React from "react";
import { SafeAreaView, TextInput, Text } from "react-native";

export default CardScreen = ({ route }) => {
  const { title, text } = route.params.data;

  return (
    <SafeAreaView>
      <TextInput value={title}></TextInput>
      <TextInput value={text}></TextInput>
    </SafeAreaView>
  );
};
