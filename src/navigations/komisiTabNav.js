import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {LogBox} from 'react-native';
import axios from 'axios';
import { urlAPI } from '../assets/URLs';

const TopTab = createMaterialTopTabNavigator()

const komisi = [
  {
    nama: 'Komisi 1',
    mitraKerja: [
      'Sekretariat DPRD',
      'Inspektorat',
      'Badan Kepegawaian Serta Pendidikan dan Pelatihan',
      "Dinas Pendidikan",
      'Dinas Administrasi Kependudukan dan Pencatatan Sipil',
      'Dinas Kepemudaan dan Olahraga',
      'Dinas Kearsipan',
      'Satuan Polisi Pamong Praja dan Kebakaran',
      'Bagian Pemerintah', 
      'Bagian Hukum',
      'Bagian Organisasi',
      'Bagian Hukum',
      'Bagian Tata Usaha Pimpinan',
      'Bagian Umum',
      'Kecamatan Kema',
      'Kecamatan Kauditan',
      'Kecamatan Airmadidi',
      'kecamatan kalawat',
      'Kecamatan dimembe',
      'Kecamatan talawaan',
      'Kecamatan Wori',
      'Kecamatan Likupang Barat, likupang timur, likupang selatan'
    ]
  },
  {
    nama: "Komisi II",
    mitraKerja: [
      'Badan Perencanaan Penelitian dan Pengembangan  Daerah',
      'Dinas Pekerjaan Umum dan Penataan Ruang',
      'Dinas Perumahan Rakyat dan Kawasan Pemukiman',
      'Dinas Perhubungan',
      'Dinas Pangan',
      'Dinas Lingkungan Hidup',
      'Dinas Komunikasi dan Informatika serta Persandian', 
      'Dinas Perdagangan',
      'Dinas Perindustrian',
      'Dinas Pembangunan',
      'Dinas Pengadaan barang dan jasa',
      'Bagian Perekonomian'
    ]
  },
  {
    nama: "Komisi III",
    mitraKerja: [
      'Badan Keuangan dan aset Daerah',
      'Badan Penanggulangan Bencana Daerah',
      'Dinas Sosial serta Pemberdayaan Masyarakat Desa',
      'Dinas Kesehatan',
      'Dinas Pemberdayaan Perempuan dan Perlindungan Anak',
      'Dinas Tenaga Kerja',
      'Dinas Penanaman Modal dan PTSP', 
      'Dinas Kelautan dan Perikanan',
      'Dinas Pariwisata',
      'Dinas Pertanian',
      'Dinas Pengendalian Penduduk dan Keluarga Berencana',
      'Bagian Kesejatraan Rakyat',
      'Bagian Keuangan',
      'Perusahaan Umum Daerah Klabat',
      'Perusahaan Daerah Air Minum',
      'RSUD Maria Walanda Maramis',
    ]
  },
]

const komisiTabNav = () => {
  LogBox.ignoreAllLogs();

  // useEffect(() => {
  //   axios.get(urlAPI + '/partner/getPartners')
  //   .then(res => {
  //     console.log(res.data)
  //   })
  // }, [])
  
  const renderTopTab = () => {
    return komisi.map((key, index) => (
      <TopTab.Screen component={() => (
        <ScrollView style={styles.container}>
          {
            key.mitraKerja.map((mitra, idx) => (
              <View key={idx} style={styles.itemWrapper}>
                <Text style={styles.text}>{mitra}</Text>
              </View>
            ))
          }
        </ScrollView>
      )} name={key.nama}/>
    ))
  }

  return (
    <TopTab.Navigator
      tabBarOptions={{
      activeTintColor: '#C1272D',
      inactiveTintColor: 'black',
      indicatorStyle: {backgroundColor: '#C1272D'},
      labelStyle: {fontSize: 14},
    }}>
      {renderTopTab()}
    </TopTab.Navigator>
  )
}

export default komisiTabNav

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5
  },
  text: {
    fontSize: 16,
  }
})
