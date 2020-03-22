import React, { useEffect, useState, useCallback } from "react";
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  Alert,
  AsyncStorage
} from "react-native";
import { usePersistedState } from "../../hooks";

import api from "../../services/api";

export default function Home() {
  const [totalActiveCases, setTotalActiveCases] = usePersistedState(
    "total_active_cases"
  );
  const [totalRecovered, setTotalRecovered] = usePersistedState(
    "total_recovered"
  );
  const [totalDeaths, setTotalDeaths] = usePersistedState("total_deaths");
  const [total, setTotal] = usePersistedState("total_cases");
  const [refreshing, setRefreshing] = usePersistedState(false);

  async function getData() {
    const response = await api.get("free-api?countryTotal=BR").catch(error => {
      Alert.alert("Algo deu errado.", error.message);
    });

    if (response && response.data && response.data.countrydata[0]) {
      const countrydata = response.data.countrydata[0];
      setTotalActiveCases(countrydata.total_active_cases);
      setTotalRecovered(countrydata.total_recovered);
      setTotalDeaths(countrydata.total_deaths);
      setTotal(countrydata.total_cases);

      await AsyncStorage.setItem("coronga", countrydata);
    }
  }

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    getData().then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    setRefreshing(true);

    handleRefresh();
  }, []);

  return (
    <ScrollView
      style={{ alignSelf: "stretch" }}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
    >
      <Text style={styles.title}>Coronavírus - Brasil</Text>
      <View style={styles.scrollview}>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Infectados:</Text>
          <Text style={styles.red}>{totalActiveCases}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Recuperados:</Text>
          <Text style={styles.green}>{totalRecovered}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Mortes:</Text>
          <Text style={styles.purple}>{totalDeaths}</Text>
        </View>
        {/* TODO */}
        <View style={styles.card}>
          <Text style={styles.subtitle}>Total de casos:</Text>
          <Text>{total}</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    backgroundColor: "#57bac1"
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    color: "#fff"
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  red: {
    color: "red"
  },
  green: {
    color: "green"
  },
  purple: {
    color: "purple"
  },
  scrollview: {
    alignItems: "center",
    alignSelf: "stretch"
  },
  card: {
    borderRadius: 5,
    padding: 25,
    flexDirection: "row",
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 25,
    marginBottom: 25,
    backgroundColor: "#fff",
    shadowColor: "#333",
    shadowOffset: {
      width: 0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8
  }
});
