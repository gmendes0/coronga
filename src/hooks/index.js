import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

export async function usePersistedState(storageKey) {
  const [value, setValue] = useState(
    (await AsyncStorage.getItem(storageKey)) || ""
  );

  useEffect(() => {
    AsyncStorage.setItem(storageKey, value).then(value);
  }, [value]);

  return [value, setValue];
}
