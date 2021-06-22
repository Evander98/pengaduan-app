import React from 'react'
import { StyleSheet, Text, View, ScrollView, Image } from 'react-native'

const data  = [
  '../assets/images/Abram Eha.jpg',
  '../assets/images/Anthoni Pusung.jpg',
  '../assets/images/Arlens Lengkong Pungus.jpg',
  '../assets/images/Arnol Lamuni.jpg',
  '../assets/images/Azhar.jpg',
  '../assets/images/Chris Yodi Longdong.jpg',
  '../assets/images/Cynthia Imelda Erkles.jpg',
  '../assets/images/Daniel Mathew Rumumpe.jpg',
  '../assets/images/Denny Kamlon Lolong.jpg',
  '../assets/images/Edwien Kambey.jpg'
]
const DaftarAnggota = () => {

  const renderImages = () => {
    return data.map((val, index) => (
      <Image source={{uri: val}} style={{width: 100, height: 100}}/>
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
  }
})
