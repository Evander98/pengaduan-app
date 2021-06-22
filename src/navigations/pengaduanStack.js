import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DaftarPengaduan from '../pages/DaftarPengaduan'
import PengaduanTunggal from '../pages/PengaduanTunggal'

const Stack = createStackNavigator()
const pengaduanStack = () => {
  return (
    <Stack.Navigator initialRouteName={"Daftar Pengaduan"} screenOptions={{headerShown: false}}>
      <Stack.Screen component={DaftarPengaduan} name={"Daftar Pengaduan"}/>
      <Stack.Screen component={PengaduanTunggal} name={"Pengaduan Tunggal"}/>
    </Stack.Navigator>
  )
}

export default pengaduanStack
