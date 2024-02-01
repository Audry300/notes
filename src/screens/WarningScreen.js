import React, { useContext } from "react";
import { deledeData } from "../services/asyncStorage";
import dataContext from "../services/context";
import {
  SafeAreaView,
  Modal,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

const WarningScreen = ({ note, onRequestClose, show }) => {
  const { notes, setNotes, keys, setKeys } = useContext(dataContext);

  return (
    <Modal transparent={true} onRequestClose={onRequestClose} visible={show}>
      <SafeAreaView style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <Text style={styles.text}>
            Are you sure you want to delete this note?
          </Text>
          <SafeAreaView style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onRequestClose}>
              <Text>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                const newArray = notes.filter(
                  (element) => element.key !== note.key
                );
                const newKeys = keys.filter((element) => element !== note.key);
                setKeys(newKeys);
                setNotes(newArray);
                await deledeData(note.key);
                onRequestClose();
              }}
            >
              <Text>Confirm</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </SafeAreaView>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 140,
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  text: {
    fontSize: 18,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: "grey",
  },
});

export default WarningScreen;
