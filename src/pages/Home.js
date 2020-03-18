import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, ScrollView, RefreshControl, View, Text } from 'react-native';

import api from '../services/api';

export default function pages() {
  const [totalActiveCases, setTotalActiveCases] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  async function getData() {

    const response = await api.get('free-api?countryTotal=BR');

    if (response.data && response.data.countrydata[0]) {
      const countrydata = response.data.countrydata[0];
      setTotalActiveCases(countrydata.total_active_cases);
      setTotalRecovered(countrydata.total_recovered);
      setTotalDeaths(countrydata.total_deaths);
    }
  }

  const handleRefresh = useCallback(() => {
    setRefreshing(true);

    getData().then(() => setRefreshing(false));
  }, [refreshing]);

  useEffect(() => {
    setRefreshing(true);

    getData().then(() => setRefreshing(false));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Corona Virus no Brasil</Text>
      <ScrollView
        style={{ alignSelf: 'stretch' }}
        contentContainerStyle={styles.scrollview}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
      >
        <View style={styles.card}>
          <Text style={styles.subtitle}>Casos:</Text>
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
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 23,
    fontWeight: 'bold',
    padding: 10,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  red: {
    color: 'red',
  },
  green: {
    color: 'green',
  },
  purple: {
    color: 'purple',
  },
  scrollview: {
    justifyContent: 'center',
    alignSelf: 'stretch',
    flex: 1,
  },
  card: {
    borderRadius: 5,
    padding: 25,
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 25,
    marginBottom: 25,
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
  }
});
