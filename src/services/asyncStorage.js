import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    console.error("Error while trying to save data", e);
  }
};

export const readData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Error while trying to read the data", e);
  }
};

export const getAllKeys = async () => {
  let keys = [];

  try {
    keys = await AsyncStorage.getAllKeys();

    return keys;
  } catch (e) {
    console.error("Error reading keys:", e);
  }
};
