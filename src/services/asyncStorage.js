import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);

    console.log("New value added to the store", jsonValue);
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

export const updateData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.mergeItem(key, jsonValue);
    console.log("Updated note: ", key);
  } catch (e) {
    console.error("Error while trying to update the data", e);
  }
};

export const deledeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    "Error while trying to delete the data", e;
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

export const clearAsyncStorage = async () => {
  try {
    await AsyncStorage.clear();

    console.log("AsyncStorage cleared successfully!");
  } catch (error) {
    console.error("Error clearing AsyncStorage:", error);
  }
};
