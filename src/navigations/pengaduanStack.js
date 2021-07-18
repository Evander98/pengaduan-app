import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import DaftarPengaduan from '../pages/DaftarPengaduan'
import PengaduanTunggal from '../pages/PengaduanTunggal'

const Stack = createStackNavigator()
const pengaduanStack = () => {
  return (
    <Stack.Navigator initialRouteName={"DaftarPengaduan"} screenOptions={{headerShown: false}}>
      <Stack.Screen component={DaftarPengaduan} name={"DaftarPengaduan"}/>
      <Stack.Screen component={PengaduanTunggal} name={"PengaduanTunggal"}/>
    </Stack.Navigator>
  )
}

export default pengaduanStack
