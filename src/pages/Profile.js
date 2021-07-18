import React, {useState, useEffect} from 'react'
import { Alert, Button, Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'  
import { reset } from '../actions/userAction'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Profile = ({navigation}) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const [onLogout, setOnLogout] = useState(false)

  useEffect(() => {
    if(onLogout){
      Alert.alert('Perhatian', 'Apakah anda yakin ingin keluar?', [
        {
          text: 'Batal',
          onPress: () => setOnLogout(false)
        },
        {
          text: 'Keluar',
          onPress: () => dispatch(reset())
        }
      ])
    }
  }, [onLogout])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{user.namaLengkap}</Text>
      </View>
      <View style={styles.content}>
        {
          user.role == 0 ?
          <TouchableOpacity onPress={() => navigation.navigate('UbahProfil')} style={styles.itemsWrapper}>
            <Text style={styles.text}>Ubah Profil</Text>
            <View style={styles.iconWrapper}>
              <MaterialCommunityIcons name='account-edit-outline' size={35} color='#656466'/>
            </View>
          </TouchableOpacity>
          : null
        }
        <TouchableOpacity onPress={() => navigation.navigate('Pengaturan')} style={styles.itemsWrapper}>
          <Text style={styles.text}>Pengaturan</Text>
          <View style={styles.iconWrapper}>
            <AntDesign name='setting' size={32} color='#656466'/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('SyaratKetentuan')} style={styles.itemsWrapper}>
          <Text style={styles.text}>Syarat dan Ketentuan</Text>
          <View style={styles.iconWrapper}>
            <Ionicons name='document-text-outline' size={32} color='#656466'/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOnLogout(true)} style={styles.itemsWrapper}>
          <Text style={styles.text}>Keluar</Text>
          <View style={styles.iconWrapper}>
            <AntDesign name='logout' size={28} color='#656466'/>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Profile

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').height/8,
    backgroundColor: '#C1272D'
  },
  name: {
    color: 'white',
    fontSize: 26
  },
  content: {
    flex: 1,
    padding: 25
  },
  itemsWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 15
  },
  text: {
    fontSize: 22,
    marginHorizontal: 15,
    color: '#656466'
  },
  iconWrapper: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
