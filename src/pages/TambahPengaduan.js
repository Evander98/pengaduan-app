import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

import {useSelector} from 'react-redux';
import {urlAPI} from '../assets/URLs';

const TambahPengaduan = () => {
  const [judul, setJudul] = useState();
  const [isi, setIsi] = useState();
  const [isError, setIsError] = useState();
  const [selected, setSelected] = useState(0);
  const [mitra, setMitra] = useState([]);


  const user = useSelector(state => state.user);

  useEffect(() => {
    if (isError) {
      Alert.alert('Pemberitahuan', isError, [
        {
          text: 'OK',
          onPress: clearInputs,
        },
      ]);
    }
  });

  
  useEffect(() => {
    axios.get(urlAPI + '/partner/getPartners')
    .then(res => {
      setMitra(res.data)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  const clearInputs = () => {
    setIsError('')
    setJudul('');
    setIsi('');
    setSelected(0)
  }

  const onSubmit = () => {
    if (judul && isi && selected > 0) {
      axios
        .post(urlAPI + '/complaint/addComplaint', {id: user.id, judul, isi, mitra: selected})
        .then(res => {
          setIsError(res.data);
        })
        .catch(err => {
          // setIsError(err)
          console.log(err);
        });
    } else {
      setIsError('Tolong masukan judul, isi dan bidang pengaduan!');
    }
  };

  const renderPicker = () => {
    if(mitra.length > 0){
      return mitra.map((val, index) => (
        <Picker.Item key={index} label={val.nama_mitra_kerja} value={val.id_mitra_kerja} />
      ))
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <TextInput
            placeholder="Judul Laporan"
            value={judul}
            onChangeText={e => setJudul(e)}
            style={styles.textInput}
          />
          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder="Isi Laporan"
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
          <Picker.Item label="Pilih bidang pengaduan" value={0} />
          {
            renderPicker()
          }
        </Picker>
      </ScrollView>
      <TouchableOpacity onPress={onSubmit} style={styles.button}>
        <Text style={styles.buttonText}>KIRIM</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TambahPengaduan;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  textInput: {
    marginTop: 5,
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
});
