import React, {useState, useEffect} from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign';


const PengaduanTunggal = ({navigation, route}) => {

  let { nama_lengkap, tanggal_pengaduan, judul_pengaduan, isi_pengaduan, nama_mitra_kerja, status } = route.params
  return (
    <ScrollView style={styles.container}>
      <View style={styles.complaintWrapper}>
        <View style={styles.row}>
          <Text style={styles.complainant}>{nama_lengkap}</Text>
          <Text style={styles.complaint}>{tanggal_pengaduan}</Text>
        </View>
        <Text style={styles.title}>{judul_pengaduan}</Text>
        <Text style={styles.complaint}>{isi_pengaduan}</Text>
        <View style={styles.wrapper}>
          <Text style={styles.status}>{nama_mitra_kerja}</Text>
        </View>
        <View style={styles.wrapper}>
          <Ionicons name={'time-outline'} size={25}/>
          <Text style={styles.status}>{status == 0 ? 'Belum diterima' : status == 1 ? 'Diterima' : status == 2 ? 'Selesai' : "Terjadi kesalahan"}</Text>
        </View>
        {/* <View style={styles.wrapper}>
          <View style={styles.likeWrapper}>
            <AntDesign
              name={isLiked ? 'like1' : 'like2'}
              size={25}
              color={isLiked ? '#C1272D' : 'black'}
              style={styles.icon}
              onPress={() => setIsLiked(prevState => !prevState)}
            />
            <Text style={styles.icon}>{like}</Text>
            <AntDesign
              name={isDisliked ? 'dislike1' : 'dislike2'}
              size={25}
              style={styles.icon}
              onPress={() => setIsDisliked(prevState => !prevState)}
            />
            <Text style={styles.icon}>0</Text>
          </View>
          <View style={styles.commentWrapper}>
            <AntDesign name="message1" size={25} style={styles.icon} />
            <Text style={styles.icon}>1</Text>
          </View>
        </View> */}
      </View>
    </ScrollView>
  )
}

export default PengaduanTunggal

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDBDB',
  },
  input: {
    backgroundColor: "white",
    padding: 15,
    fontSize: 20,

  },
  complaintWrapper: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  complainant: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  complaint: {
    fontSize: 16,
    marginBottom: 10
  },
  wrapper: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    alignItems: 'center'
  },
  status: {
    fontSize: 18,
    margin: 10
  },
  likeWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    margin: 5,
    marginVertical: 10,
  },
})
