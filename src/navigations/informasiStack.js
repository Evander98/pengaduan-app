import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import DaftarAnggota from '../pages/DaftarAnggota'
import Informasi from '../pages/Informasi'
import Legislasi from '../pages/Legislasi'
import Hasil from '../pages/Hasil'
import TambahLegislasi from '../pages/TambahLegislasi'
import TambahHasil from '../pages/TambahHasil'

const Stack = createStackNavigator()

const informasiStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen component={Informasi} name='Informasi'/>
      <Stack.Screen component={DaftarAnggota} name='Anggota'/>
      <Stack.Screen component={Legislasi} name='Legislasi'/>
      <Stack.Screen component={Hasil} name='Hasil'/>
      <Stack.Screen component={TambahLegislasi} name='TambahLegislasi'/>
      <Stack.Screen component={TambahHasil} name='TambahHasil'/>
    </Stack.Navigator>
  )
}

export default informasiStack
