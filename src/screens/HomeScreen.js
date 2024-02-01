import React, { useContext, useState, useEffect } from "react";
import { ScrollView, SafeAreaView } from "react-native";
import { Card } from "../components/Card";
import { AddButton } from "../components/addButton";
import dataContext from "../services/context";
import WarningScreen from "./WarningScreen";

export default HomeScreen = ({ navigation }) => {
  const { notes } = useContext(dataContext);
  const [note, setNote] = useState({});
  const [del, setDel] = useState(false);

  useEffect(() => {
    if (note.key !== "") {
      setDel(true);
    }
  }, [note]);

  return (
    <SafeAreaView>
      <ScrollView>
        {notes.map((item, index) => (
          <Card
            key={item.key}
            title={item.title}
            text={item.text}
            onPress={() => navigation.navigate("cardView", { data: item })}
            onLongPress={() => {
              setNote(item);
            }}
          />
        ))}
        <AddButton
          onPress={() =>
            navigation.navigate("cardView", { data: { title: "", text: "" } })
          }
        />
      </ScrollView>
      <WarningScreen
        visible={false}
        onClose={() => setDel(false)}
        note={note}
        show={del}
        onRequestClose={() => setDel(false)}
      />
    </SafeAreaView>
  );
};
