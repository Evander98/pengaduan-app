import React from 'react'
import { View, Text } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import DaftarAnggota from '../pages/DaftarAnggota'
import Informasi from '../pages/Informasi'

const Stack = createStackNavigator()

const informasiStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen component={Informasi} name='Informasi'/>
      <Stack.Screen component={DaftarAnggota} name='Daftar Anggota'/>
    </Stack.Navigator>
  )
}

export default informasiStack
