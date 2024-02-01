import React, { useContext, useState, useEffect } from "react";
import { SafeAreaView, TextInput, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import dataContext from "../services/context";

export default CardScreen = ({ route }) => {
  const { title, text } = route.params.data;
  const date = new Date();
  const key = date.toISOString(); // this will be used as a key to store the note in the async storage
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
    // Save the changes before the user leaves the card screen
    const saveBeforeMovingBacktoHome = navigation.addListener(
      "beforeRemove",
      () => {
        if (
          // this condition will be true if the note is new, so we have to use a new key to save it
          title == "" &&
          text == "" &&
          note.title !== "" &&
          note.text !== ""
        ) {
          setNotes([...notes, { key, ...note }]);
        } else if (title !== note.title || text !== note.text) {
          // Check if the user has made changes to the notes by verifying if the routes params differ from the component variables
          setNotes((prevNotes) =>
            prevNotes.map((oldNote) =>
              // Looking thru the notes array to find the note to update
              oldNote.title === title && oldNote.text === text
                ? {
                    ...oldNote,
                    title: note.title,
                    text: note.text,
                    key,
                    change: "!",
                  } // Update the title and text
                : oldNote
            )
          );
        }
      }
    );

    return () => {
      saveBeforeMovingBacktoHome();
    };
  }, [navigation, note, setNotes, title, text]);

  const handleTitleChange = (newTitle) => {
    setNote((prevNote) => ({ ...prevNote, title: newTitle }));
  };

  const handleTextChange = (newText) => {
    setNote((prevNote) => ({ ...prevNote, text: newText }));
  };
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView style={styles.titleContainer}>
        <TextInput
          style={styles.titleInput}
          value={note.title}
          onChangeText={handleTitleChange}
          placeholder="Title"
        ></TextInput>
      </SafeAreaView>

      <SafeAreaView style={styles.textContainer}>
        <TextInput
          style={styles.textInput}
          value={note.text}
          onChangeText={handleTextChange}
          placeholder="Note..."
          multiline
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  titleContainer: {
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: "gray",
  },
  titleInput: {
    fontSize: 18,
    fontWeight: "bold",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: 4,
  },
  textContainer: {
    flex: 1,
  },
  textInput: {
    fontSize: 16,
    lineHeight: 24,
  },
});
