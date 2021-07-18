import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image, Dimensions } from 'react-native'
import ArhamEha from '../assets/images/AbramEha.jpg'
import AnthoniPusung from '../assets/images/AnthoniPusung.jpg'
import ArlensLengkongPungus from '../assets/images/ArlensLengkongPungus.jpg'
import ArnolLamuni from '../assets/images/ArnolLamuni.jpg'
import Azhar from '../assets/images/Azhar.jpg'
const data  = [
  ArhamEha,
  AnthoniPusung,
  ArlensLengkongPungus,
  ArnolLamuni,
  Azhar
]
const DaftarAnggota = () => {

  const renderImages = () => {
    return data.map((val, index) => (
      <Image source={val} style={styles.image}/>
    ))
  }
  return (
    <ScrollView style={styles.container}>
      {renderImages()}
    </ScrollView>
  )
}

export default DaftarAnggota

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width,
    resizeMode: 'contain',
  }
})
