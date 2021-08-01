import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Date, Alert } from 'react-native'
import { urlAPI } from '../assets/URLs'

const TambahHasil = ({navigation}) => {

  const [judul, setJudul] = useState()
  const [isi, setIsi] = useState()
  const [selected, setSelected] = useState()
  const [komisi, setKomisi] = useState([])

  useEffect(() => {
    getKomisi()
  }, [])
  
  const getKomisi = () => {
    axios.get(urlAPI + "/partner/getCommissions")
    .then(res => {
      setKomisi(res.data)
    })
    .catch(err => console.log(err))
  }

  const onSubmit = () => {
    if(judul && isi && selected > 0) {
      axios.post(urlAPI + '/result/add', {judul, isi, selected})
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

  const renderPicker = () => {
    if(komisi.length > 0){
      return komisi.map((val, index) => (
        <Picker.Item key={index} label={val.nama_komisi} value={val.id_komisi} />
      ))
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <TextInput
            placeholder="Judul"
            value={judul}
            onChangeText={e => setJudul(e)}
            style={styles.textInput}
          />
          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder="Isi"
            textAlignVertical={'top'}
            value={isi}
            onChangeText={e => setIsi(e)}
            autoCorrect={false}
            style={styles.textInput}
          />
        </View>
        <Picker
          selectedValue={selected}
          onValueChange={(itemValue, itemIndex) =>
            setSelected(itemValue)
          }>
          <Picker.Item label="Pilih Komisi" value={0} />
          {
            renderPicker()
          }
        </Picker>
      </ScrollView>
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>KIRIM</Text>
      </TouchableOpacity>
    </View>
  )
}

export default TambahHasil

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
