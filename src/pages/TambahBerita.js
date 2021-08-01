import axios from 'axios'
import React, { useState } from 'react'
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { urlAPI } from '../assets/URLs'

const TambahBerita = ({navigation}) => {
  const [judul, setJudul] = useState()
  const [isi, setIsi] = useState()
  const [pengusul, setPengusul] = useState()
  

  const onSubmit = () => {
    if(judul && isi && pengusul) {
      axios.post(urlAPI + '/news/add', {judul, isi, pengusul})
      .then((res) => {
        // console.log(res.data)
        navigation.goBack()
      })
      .catch((err) => {
        console.log(err)
      })
    }else{
      Alert.alert("Pemberitahuan!", "Tolong masukan semua kolom yang tersedia!")
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <TextInput
            placeholder="Judul Berita"
            value={judul}
            onChangeText={e => setJudul(e)}
            style={styles.textInput}
          />
          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder="Isi Berita"
            textAlignVertical={'top'}
            value={isi}
            onChangeText={e => setIsi(e)}
            autoCorrect={false}
            style={styles.textInput}
          />
          <TextInput
            placeholder="Dari"
            value={pengusul}
            onChangeText={e => setPengusul(e)}
            style={styles.textInput}
          />
        </View>
      </ScrollView>
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>SIMPAN</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TambahBerita

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  textInput: {
    marginBottom: 15,

    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#C1272D',
  },
  button: {
    backgroundColor: '#C1272D',
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },
})