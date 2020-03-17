import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import api from '../services/api';

export default function pages() {
  const [data, setData] = useState();

  useEffect(() => {
    async function getData() {

      const response = await api.get('free-api?countryTotal=BR');

      setData(response.data);
    }

    getData();

    // console.log(data);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Corona Virus no Brasil</Text>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Casos:</Text>
        <Text style={styles.red}>{data.countrydata[0].total_active_cases}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Recuperados:</Text>
        <Text style={styles.green}>{data.countrydata[0].total_recovered}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.subtitle}>Mortes:</Text>
        <Text style={styles.purple}>{data.countrydata[0].total_deaths}</Text>
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
