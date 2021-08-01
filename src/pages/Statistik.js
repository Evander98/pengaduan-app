import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { PieChart } from 'react-native-chart-kit'
import { urlAPI } from '../assets/URLs';

const Statistik = ({navigation}) => {

  const [data, setData] = useState(() => ([]))
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
    });
    return unsubscribe;
  }, [navigation])

  const getData = () => {
    axios.get(urlAPI + '/complaint/countComplaintByPartner')
    .then(res => {
      var tempData = []
      for(let i in res.data){
        tempData.push({
          name: res.data[i].nama_mitra_kerja,
          count: res.data[i].count,
          color: `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`,
          legendFontColor: "#7F7F7F",
          legendFontSize: 15
        })
      }
      setData(tempData)
    })
    .catch(err => console.log(err))
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Data Rekapan Pengaduan Berdasarkan Mitra Kerja</Text>
      <View style={styles.chart}>
        {
          data.length > 0 ?
          <PieChart
            data={data}
            width={Dimensions.get("window").width - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            accessor={"count"}
            backgroundColor={"transparent"}
            // absolute
          />
          : <Text>Loading...</Text>
        }

      </View>
    </View>
  )
}

export default Statistik

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    textAlign: 'center',
    fontSize: 26,
  },
  chart:{
    flex: 1,
    justifyContent: 'center'
    
  }
})
