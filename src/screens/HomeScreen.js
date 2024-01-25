import React, { useContext } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Card } from "../components/Card";
import { AddButton } from "../components/addButton";
import dataContext from "../services/context";

export default HomeScreen = ({ navigation }) => {
  const { notes } = useContext(dataContext);

  return (
    <SafeAreaView>
      <ScrollView>
        {notes.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            text={item.text}
            onPress={() => navigation.navigate("cardView", { data: item })}
          />
        ))}
        <AddButton
          onPress={() =>
            navigation.navigate("cardView", { data: { title: "", text: "" } })
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};
