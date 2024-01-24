import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  StyleSheet,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export const AddButton = ({ onPress }) => {
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={onPress}>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      </TouchableWithoutFeedback>
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
