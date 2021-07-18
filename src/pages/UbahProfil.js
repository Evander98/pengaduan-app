import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native'
import { useSelector } from 'react-redux'
import { urlAPI } from '../assets/URLs'

const UbahProfil = ({navigation}) => {
  const [namaLengkap, setNamaLengkap] = useState('')
  const [email, setEmail] = useState('')
  const [telepon, setTelepon] = useState('')
  const [kelurahan, setKelurahan] = useState('')
  const [kecamatan, setKecamatan] = useState('')
  const [kodePos, setKodePos] = useState('')
  const [isError, setIsError] = useState();


  const user = useSelector(state => state.user)

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log(user)
      setNamaLengkap(user.namaLengkap)
      setEmail(user.email)
      setTelepon(user.telepon)
      setKelurahan(user.kelurahan)
      setKecamatan(user.kecamatan)
      setKodePos(user.kodePos)
    });
    return unsubscribe;
  }, [navigation])
  
  useEffect(() => {
    if (isError) {
      Alert.alert('Pemberitahuan', isError, [
        {
          text: 'OK',
          onPress: () => setIsError(''),
        },
      ]);
    }
  }, [isError]);

  const onProfileSubmit = () => {
    if(namaLengkap && email && telepon && kelurahan && kecamatan && kodePos){
      var data = {
        nama_lengkap: namaLengkap,
        email,
        nomor_telepon: telepon,
        kelurahan,
        kecamatan,
        kode_pos: kodePos
      };
      axios.put(`${urlAPI}/user/editProfile?id=${user.id}`, data)
      .then(res => {
        console.log(res.data)
        setNamaLengkap(res.data.nama_lengkap)
        setEmail(res.data.email)
        setTelepon(res.data.nomor_telepon)
        setKelurahan(res.data.kelurahan)
        setKecamatan(res.data.kecamatan)
        setKodePos(res.data.kode_pos)
        setIsError('Data berhasil diedit!')
      })
      .catch(err => {
        console.log(err)
      })
    }else{
      setIsError('Mohon untuk mengisi semua data yang diperlukan!')
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.inputWrapper}>
          <TextInput value={namaLengkap} onChangeText={e => setNamaLengkap(e)} placeholder="Nama Lengkap" style={styles.textInput}/>
          <TextInput value={email} onChangeText={e => setEmail(e)} placeholder="Email" value={email} style={{...styles.textInput, color: 'red'}} editable={false}/>
          <TextInput value={telepon} keyboardType='numeric' onChangeText={e => setTelepon(e)} placeholder="Nomor Telepon" style={styles.textInput}/>
          <TextInput value={kelurahan} onChangeText={e => setKelurahan(e)} placeholder="Kelurahan" style={styles.textInput}/>
          <TextInput value={kecamatan} onChangeText={e => setKecamatan(e)} placeholder="Kecamatan" style={styles.textInput}/>
          <TextInput value={kodePos} keyboardType='numeric' onChangeText={e => setKodePos(e)} placeholder="Kode Pos" style={styles.textInput}/>
        </View>
        <TouchableOpacity onPress={onProfileSubmit} style={styles.button}>
          <Text style={styles.buttonText}>Simpan</Text>
        </TouchableOpacity>
      </ScrollView>
      
    </View>
  )
}

export default UbahProfil

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop:50,
    paddingHorizontal: 20,

  },
  textInput: {
    borderBottomColor: 'red',
    borderBottomWidth: 1,
    fontSize: 20,
    marginVertical: 5
  },
  inputWrapper: {
    marginVertical: 50,
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
