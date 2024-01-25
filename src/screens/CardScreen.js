import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, TextInput } from "react-native";
import dataContext from "../services/context";
import { useNavigation } from "@react-navigation/native";

export default CardScreen = ({ route }) => {
  const { title, text } = route.params.data;

  const [note, setNote] = useState({
    title,
    text,
  });

  const { notes, setNotes } = useContext(dataContext);

  const navigation = useNavigation();
  useEffect(() => {
    setNote({
      title,
      text,
    });
  }, [title, text]);

  useEffect(() => {
    const saveBeforeMovingBacktoHome = navigation.addListener(
      "beforeRemove",
      () => {
        if (
          title == "" &&
          text == "" &&
          note.title !== "" &&
          note.text !== ""
        ) {
          setNotes([...notes, note]);
        } else if (title !== note.title || text !== note.text) {
          console.log("Executing the second condition");
          // Check if the user has made changes to the notes by verifying if the routes params differ from the component variables
          setNotes((prevNotes) =>
            prevNotes.map((oldNote) =>
              // Looking thru the notes array to find the note to update
              oldNote.title === title && oldNote.text === text
                ? { title: note.title, text: note.text } // Update the title and text
                : oldNote
            )
          );
        }
      }
    );

    return () => {
      saveBeforeMovingBacktoHome();
    };
  }, [navigation, note, setNotes]);

  const handleTitleChange = (newTitle) => {
    setNote((prevNote) => ({ ...prevNote, title: newTitle }));
  };

  const handleTextChange = (newText) => {
    setNote((prevNote) => ({ ...prevNote, text: newText }));
  };
  return (
    <SafeAreaView>
      <TextInput
        value={note.title}
        onChangeText={handleTitleChange}
      ></TextInput>
      <TextInput value={note.text} onChangeText={handleTextChange}></TextInput>
    </SafeAreaView>
  );
};
