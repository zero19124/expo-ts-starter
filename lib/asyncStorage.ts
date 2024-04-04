import AsyncStorage from "@react-native-async-storage/async-storage";

const setAsyncStore = async (key: string, value: any) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log(jsonValue, "storeData");
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {
    // saving error
  }
};
const getAsyncStoreData = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    console.log(jsonValue, "getAsyncStoreData");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
  }
};

export { setAsyncStore, getAsyncStoreData };
