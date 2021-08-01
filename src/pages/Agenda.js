import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { urlAPI } from '../assets/URLs'

const Agenda = ({navigation}) => {
  
  const [data, setData] = useState([])
  
  const user = useSelector(state => state.user)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getAgenda()
    });
    return unsubscribe;
  }, [navigation])
  
  const getAgenda = () => {
    axios.get(urlAPI + '/schedule/get')
    .then(res => {
      // console.log(res.data)
      setData(res.data)
    })
    .catch(err => console.log(err))
  }

  const renderCard = () => {
    return data.map((key, index) => (
      <View key={index} style={styles.card}>
        <Text style={styles.cardTitle}>{key.judul_agenda}</Text>
        <Text style={styles.cardContent}>{key.isi_agenda}</Text>
        <Text style={styles.cardProposer}>{key.pj}</Text>
      </View>
    ))
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {
          user.role == 1 ?
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("TambahAgenda")}>
            <Text style={styles.buttonText}>Tambah Agenda</Text>
          </TouchableOpacity>
          : null
        }
        {renderCard()}
      </ScrollView>
    </View>
  )
}

export default Agenda

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 10,
    borderWidth: 1,
    backgroundColor: "white",
    borderRadius: 5
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