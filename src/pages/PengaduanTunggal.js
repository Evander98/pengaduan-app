import React, {useState, useEffect} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {urlAPI} from '../assets/URLs';
import {Picker} from '@react-native-picker/picker';

const PengaduanTunggal = ({navigation, route}) => {
  const user = useSelector(state => state.user);
  let {
    nama_lengkap,
    tanggal_pengaduan,
    judul_pengaduan,
    isi_pengaduan,
    nama_mitra_kerja,
    status,
    id_pengaduan,
  } = route.params;

  const [isiKomentar, setIsiKomentar] = useState('');
  const [daftarKomentar, setDaftarKomentar] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      axios
        .get(urlAPI + `/complaint/getComment?id_pengaduan=${id_pengaduan}`)
        .then(res => {
          setDaftarKomentar(res.data);
          // console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    });
    return unsubscribe;
  }, [isiKomentar]);

  const updateStatus = statusValue => {
    axios
      .put(
        urlAPI +
          `/complaint/updateStatus?id=${id_pengaduan}&status=${statusValue}`,
      )
      .then(res => {
        // console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const sendComment = () => {
    if (isiKomentar) {
      axios
        .post(urlAPI + '/complaint/comment', {
          id_user: user.id,
          id_pengaduan,
          isi_komentar: isiKomentar,
        })
        .then(res => {
          setDaftarKomentar(res.data);
          setIsiKomentar('');
        });
    }
  };

  const renderComment = () => {
    return daftarKomentar.map((key, index) => (
      <View key={index} style={styles.commentWrapper}>
        <Text style={styles.complainant}>{key.nama_lengkap}</Text>
        <Text style={styles.complaint}>{key.isi_komentar}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
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
          {
            user.role == 1 ?
            <Picker selectedValue={status} onValueChange={val => updateStatus(val)}>
              <Picker.Item label={"Belum diterima"} value={0} />
              <Picker.Item label={"Diterima"} value={1} />
              <Picker.Item label={"Selesai"} value={2} />
            </Picker>
            :
            <View style={styles.wrapper}>
              <Ionicons name={'time-outline'} size={25} />
              <Text style={styles.status}>{status == 0 ? 'Belum diterima' : status == 1 ? 'Diterima' : status == 2 ? 'Selesai' : "Terjadi kesalahan"}</Text>
            </View>
          }
        </View>
        {renderComment()}
      </ScrollView>
      {
        user.role == 0 ?
        <View>
          <TextInput
            value={isiKomentar}
            onChangeText={e => setIsiKomentar(e)}
            onSubmitEditing={sendComment}
            style={styles.input}
          />
          <Feather
            name="send"
            size={25}
            onPress={sendComment}
            style={styles.icon}
          />
        </View>
        : null
      }
    </View>
  );
};

export default PengaduanTunggal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DBDBDB',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    paddingRight: 55,
    fontSize: 20,
    margin: 7,
    borderRadius: 35,
  },
  complaintWrapper: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    marginBottom: 10,
  },
  wrapper: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'grey',
    alignItems: 'center',
  },
  status: {
    fontSize: 18,
    margin: 10,
  },
  commentWrapper: {
    margin: 5,
    paddingHorizontal: 10,
  },
  icon: {
    top: 24,
    right: 25,
    position: 'absolute',
    zIndex: 9,
    color: '#C1272D'
  },
});
