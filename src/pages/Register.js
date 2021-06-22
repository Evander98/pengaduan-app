import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {urlAPI} from '../assets/URLs';
import {ifError, loggedIn, reset} from '../actions/userAction';
import {useSelector, useDispatch} from 'react-redux';
import {CommonActions} from '@react-navigation/native';
import CheckBox from '@react-native-community/checkbox';
import axios from 'axios';

const Register = ({navigation}) => {
  const [namaLengkap, setNamaLengkap] = useState();
  const [email, setEmail] = useState();
  const [sandi, setSandi] = useState();
  const [konfirmasi, setKonfirmasi] = useState();
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const user = useSelector(state => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user.id) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'Home'}],
        }),
      );
    }
  }, [user.id]);

  useEffect(() => {
    if (user.error) {
      Alert.alert('Perhatian', user.error, [
        {
          text: 'OK',
          onPress: () => dispatch(ifError('')),
        },
      ]);
    }
  });

  const register = () => {
    if (namaLengkap && email && sandi && konfirmasi) {
      if (sandi == konfirmasi) {
        axios
          .post(urlAPI + '/auth/onRegister', {namaLengkap, email, sandi})
          .then(res => {
            res.data.msg
              ? dispatch(ifError(res.data.msg))
              : dispatch(loggedIn(res.data));
          })
          .catch(err => {
            // dispatch(ifError(err))
            console.log(err);
          });
      } else {
        dispatch(ifError('Konfirmasi kata sandi tidak benar, periksa kembali!'))
      }
    } else {
      dispatch(ifError('Tolong masukan semua data yang dibutuhkan!'))
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <TextInput
          value={namaLengkap}
          placeholder="Nama Lengkap"
          onChangeText={e => setNamaLengkap(e)}
          style={styles.input}
        />
        <TextInput
          value={email}
          placeholder="Alamat Email"
          onChangeText={e => setEmail(e)}
          style={styles.input}
        />
        <TextInput
          value={sandi}
          placeholder="Kata Sandi"
          secureTextEntry={sandi ? true : false}
          onChangeText={e => setSandi(e)}
          style={styles.input}
        />
        <TextInput
          value={konfirmasi}
          placeholder="Ulangi Kata Sandi"
          secureTextEntry={konfirmasi ? true : false}
          onChangeText={e => setKonfirmasi(e)}
          style={styles.input}
        />
        <View style={styles.wrapper}>
          <CheckBox
            value={toggleCheckBox}
            onValueChange={() => setToggleCheckBox(prevState => !prevState)}
          />
          <TouchableOpacity onPress={() => navigation.navigate('SyaratKetentuan')}>
            <Text style={styles.text}>
              Saya setuju dengan syarat dan ketentuan yang berlaku
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {toggleCheckBox ? (
        <TouchableOpacity style={styles.button} onPress={register}>
          <Text style={styles.buttonText}>DAFTAR</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={{...styles.button, backgroundColor: 'grey'}} disabled>
          <Text style={styles.buttonText}>DAFTAR</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  contentWrapper: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    backgroundColor: '#E7E5E8',
    borderColor: 'grey',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    flexShrink: 1,
    fontSize: 17,
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
