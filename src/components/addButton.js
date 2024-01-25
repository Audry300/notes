import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const AddButton = ({ onPress }) => {
  return (
    <SafeAreaView>
      <TouchableOpacity style={styles.addButton} onPress={onPress}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  addButton: {
    backgroundColor: "grey",
    padding: 16,
    borderRadius: 50,
    margin: 16,
    alignSelf: "flex-end",
  },
  addButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
  },
});
