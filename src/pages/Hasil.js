import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { urlAPI } from '../assets/URLs'

const Hasil = ({navigation}) => {
  const [data, setData] = useState([])

  const user = useSelector(state => state.user)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getHasil()
    });
    return unsubscribe;
  }, [navigation])

  const getHasil = () => {
    axios.get(urlAPI + '/result/get')
    .then(res => {
      setData(res.data);
      console.log(res.data)
    })
  }

  const renderCard = () => {
    return data.map((key, index) => (
      <View key={key.id} style={styles.card}>
        {/* <Text style={styles.cardContent}>{key.tanggal}</Text> */}
        <Text style={styles.cardContent}>1 Juli 2021</Text>
        <Text style={styles.cardTitle}>{key.judul_hasil}</Text>
        <Text style={styles.cardContent}>{key.isi_hasil}</Text>
      </View>
    ))
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          user.role == 1 ?
          <TouchableOpacity onPress={() => navigation.navigate("TambahHasil")} style={styles.button}>
            <Text style={styles.buttonText}>Tambah Hasil</Text>
          </TouchableOpacity>
          : null
        }
        {
          data.length > 0 ?
          renderCard()
          : <Text>Belum ada hasil meeting</Text>
        }
      </ScrollView>
    </View>
  )
}

export default Hasil

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5,
    paddingVertical: 10
  },
  cardTitle: {
    margin: 10,
    fontWeight: 'bold',
    fontSize: 18
  },
  cardContent: {
    marginHorizontal: 10,
    fontSize: 16
  },
  cardProposer: {
    margin: 10,
  },
  button: {
    margin: 10,
    borderRadius: 7,
    width: Dimensions.get('window').width/2,
    height: Dimensions.get('window').width/8,
    backgroundColor: '#C1272D',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18
  }
})
