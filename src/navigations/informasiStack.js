import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import DaftarAnggota from '../pages/DaftarAnggota'
import Informasi from '../pages/Informasi'
import Legislasi from '../pages/Legislasi'
import Hasil from '../pages/Hasil'
import Naskah from '../pages/Naskah'
import Berita from '../pages/Berita'
import Agenda from '../pages/Agenda'
import TambahLegislasi from '../pages/TambahLegislasi'
import TambahHasil from '../pages/TambahHasil'
import TambahNaskah from '../pages/TambahNaskah'
import TambahBerita from '../pages/TambahBerita'
import TambahAgenda from '../pages/TambahAgenda'


const Stack = createStackNavigator()

const informasiStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen component={Informasi} name='Informasi'/>
      <Stack.Screen component={DaftarAnggota} name='Anggota'/>
      <Stack.Screen component={Legislasi} name='Legislasi'/>
      <Stack.Screen component={Hasil} name='Hasil'/>
      <Stack.Screen component={Naskah} name='Naskah'/>
      <Stack.Screen component={Berita} name='Berita'/>
      <Stack.Screen component={Agenda} name='Agenda'/>
      <Stack.Screen component={TambahLegislasi} name='TambahLegislasi'/>
      <Stack.Screen component={TambahHasil} name='TambahHasil'/>
      <Stack.Screen component={TambahNaskah} name='TambahNaskah'/>
      <Stack.Screen component={TambahBerita} name='TambahBerita'/>
      <Stack.Screen component={TambahAgenda} name='TambahAgenda'/>
    </Stack.Navigator>
  )
}

export default informasiStack
