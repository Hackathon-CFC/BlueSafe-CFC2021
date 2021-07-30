
import AsyncStorage from '@react-native-async-storage/async-storage';

const _storeData = async (key , data) => {
    try {
      await AsyncStorage.setItem(
        key,
        data
      );
      return true;
    } catch (error) {
      return error;
    }
};

const _retrieveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        return value
      }
    } catch (error) {
      return error;
    }
};

  export { _storeData, _retrieveData};