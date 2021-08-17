import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { urlAPI } from '../assets/URLs'

// const users = [
//   {
//     id: 0,
//     nama_lengkap: 'evander',
//     kecamatan: 'evan@mail.com',
//     kelurahan: 'kombos',
//   }
// ]

const DaftarPengguna = ({navigation}) => {

  const [users, setUsers] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUsers()
    });
    return unsubscribe;
  }, [navigation])

  const getUsers = () => {
    axios.get(urlAPI + '/user/getUsers')
    .then(res => {
      setUsers(res.data)
    })
    .catch(err => console.log(err))
  }

  const renderPengguna = () => {
    if(users.length > 0) {
      return users.map(key => (
        <View key={key.id} style={styles.itemWrapper}>
          <Text style={styles.name}>{key.nama_lengkap}</Text>
          <Text>{key.email}</Text>
          <Text>{`${key.kelurahan}, ${key.kecamatan}`}</Text>
        </View>
      ))
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        {renderPengguna()}
      </ScrollView>
    </View>
  )
}

export default DaftarPengguna

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20
    // backgroundColor: 'red'
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
  }
})
