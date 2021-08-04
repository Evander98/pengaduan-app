import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {urlAPI} from '../assets/URLs';
import Feather from 'react-native-vector-icons/Feather';

const DaftarPengaduan = ({navigation}) => {
  const [data, setData] = useState([]);
  const [like, setLike] = useState();
  const [isLiked, setIsLiked] = useState();
  const [isDisliked, setIsDisliked] = useState();
  const [searchInput, setSearchInput] = useState();
  const [countComments, setCountComments] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPengaduanData();
      getCountComments();
    });
    return unsubscribe;
  }, [navigation, data]);

  const getPengaduanData = () => {
    axios
      .get(urlAPI + '/complaint/complaintList')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getCountComments = () => {
    axios
      .get(urlAPI + '/complaint/countComments')
      .then(res => {
        setCountComments(res.data);
        // console.log(res.data)
      })
      .catch(err => console.log(err));
  };

  const onSubmitSearch = () => {
    if(searchInput){
      axios
        .get(urlAPI + `/find/searchComplaint?keywords=${searchInput}`)
        .then(res => {
          setData(res.data);
          // console.log(res.data);
        })
        .catch(err => console.log(err));
    }else{
      getPengaduanData()
    }
  };

  const renderData = () => {
    return data.map((key, index) => (
      <TouchableOpacity
        key={index}
        style={styles.complaintWrapper}
        onPress={() => navigation.navigate('PengaduanTunggal', key)}>
        <View style={styles.row}>
          <Text style={styles.complainant}>{key.nama_lengkap}</Text>
          <Text style={styles.complaint}>{key.tanggal_pengaduan}</Text>
        </View>
        <Text style={styles.title}>{key.judul_pengaduan}</Text>
        <Text style={styles.complaint}>{key.isi_pengaduan}</Text>
        <View style={styles.wrapper}>
          <Text style={styles.status}>{key.nama_mitra_kerja}</Text>
        </View>
        <View style={styles.wrapper}>
          <Ionicons name={'time-outline'} size={25} />
          <Text style={styles.status}>
            {key.status == 0
              ? 'Belum diterima'
              : key.status == 1
              ? 'Diterima'
              : key.status == 2
              ? 'Selesai'
              : 'Terjadi kesalahan'}
          </Text>
        </View>
        <View style={styles.wrapper}>
          <View style={styles.likeWrapper}>
            {/* <AntDesign
              name={isLiked ? 'like1' : 'like2'}
              size={25}
              color={isLiked ? '#C1272D' : 'black'}
              style={styles.icon}
              onPress={() => setIsLiked(prevState => !prevState)}
            /> */}
            <Text style={styles.icon}>{like}</Text>
            {/* <AntDesign
              name={isDisliked ? 'dislike1' : 'dislike2'}
              size={25}
              style={styles.icon}
              onPress={() => setIsDisliked(prevState => !prevState)}
            /> */}
            {/* <Text style={styles.icon}>0</Text> */}
          </View>
          {
            key.similarity ?
            <View style={styles.likeWrapper}>
              <Text>{key.similarity.toFixed(2)}</Text>
            </View>
            : null
          }
          <View style={styles.commentWrapper}>
            <AntDesign name="message1" size={25} style={styles.icon} />
            {
              countComments.map(count =>
                key.id_pengaduan == count.id_pengaduan ? (
                  <Text style={styles.icon}>{count.jumlahKomentar}</Text>
                ) : null,
              )
              // <Text style={styles.icon}></Text>
            }
          </View>
        </View>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <TextInput
            value={searchInput}
            onChangeText={e => setSearchInput(e)}
            placeholder="Search..."
            style={styles.input}
            onSubmitEditing={onSubmitSearch}
          />
          <Feather
            name="search"
            size={25}
            onPress={onSubmitSearch}
            style={styles.searchIcon}
          />
        </View>
        {data.length > 0 ? (
          <View>
            {
              data[0].hasOwnProperty('similarity') ? 
              <Text style={styles.status}>{"Menemukan " + data.length + " hasil"}</Text>
              : null
            }
            {renderData()}
          </View>
        ) : (
          <Text style={{...styles.title, textAlign: 'center', marginTop: 150}}>
            Belum ada pengaduan
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

export default DaftarPengaduan;

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
  likeWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentWrapper: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    margin: 5,
    marginVertical: 10,
  },
  searchIcon: {
    top: 15,
    right: 20,
    position: 'absolute',
    zIndex: 9,
    color: '#C1272D',
  },
});
