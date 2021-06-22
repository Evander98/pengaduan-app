import React, {useState, useEffect} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonActions} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {urlAPI} from '../assets/URLs';
import Fontisto from 'react-native-vector-icons/Fontisto';
import axios from 'axios';
import {ifError, loggedIn} from '../actions/userAction';

const Login = ({navigation}) => {
  const [email, setEmail] = useState();
  const [sandi, setSandi] = useState();

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
      Alert.alert('Alert', user.error, [
        {
          text: 'OK',
          onPress: () => dispatch(ifError('')),
        },
      ]);
    }
  }, [user.error]);

  const onLogin = () => {
    if (email && sandi) {
      axios.get(urlAPI + '/auth/onLogin', {params: {email, sandi}})
      .then(res => {
        console.log(res.data)
        res.data.msg
          ? dispatch(ifError(res.data.msg))
          : dispatch(loggedIn(res.data));
      })
      .catch(err => {
        // dispatch(ifError(err))
        console.log(err)
      })
    } else {
      dispatch(ifError('Tolong masukan semua data yang dibutuhkan!'))
    }
  };

  return (
    <View style={styles.container}>
      <Fontisto name="email" size={90} style={styles.icon} />
      <View style={styles.contentWrapper}>
        <TextInput
          value={email}
          placeholder="Alamat Email"
          onChangeText={e => setEmail(e)}
          style={styles.input}
        />
        <TextInput
          value={sandi}
          secureTextEntry={sandi ? true : false}
          placeholder="Kata Sandi"
          onChangeText={e => setSandi(e)}
          style={styles.input}
        />
      </View>
      <TouchableOpacity onPress={onLogin} style={styles.button}>
        <Text style={styles.buttonText}>MASUK</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  icon: {
    alignSelf: 'center',
    color: '#C1272D',
    marginBottom: 50,
  },
  contentWrapper: {
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderRadius: 25,
    borderWidth: 1,
    borderRadius: 25,
    marginVertical: 10,
    paddingHorizontal: 20,
    fontSize: 20,
    backgroundColor: '#E7E5E8',
    borderColor: 'grey',
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
