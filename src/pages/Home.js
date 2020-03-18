import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import api from '../services/api';

export default function pages() {
  const [totalActiveCases, setTotalActiveCases] = useState(0);
  const [totalRecovered, setTotalRecovered] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);

  useEffect(() => {
    async function getData() {

      const response = await api.get('free-api?countryTotal=BR');

      if (response.data && response.data.countrydata[0]) {
        const countrydata = response.data.countrydata[0];
        setTotalActiveCases(countrydata.total_active_cases);
        setTotalRecovered(countrydata.total_recovered);
        setTotalDeaths(countrydata.total_deaths);
      }
    }

    getData();

    // console.log(data);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Corona Virus no Brasil</Text>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Casos:</Text>
        <Text style={styles.red}>{totalActiveCases}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Recuperados:</Text>
        <Text style={styles.green}>{totalRecovered}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Mortes:</Text>
        <Text style={styles.purple}>{totalDeaths}</Text>
      </View>
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
    fontSize: 19,
    fontWeight: 'bold',
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
  }
});
