import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Profile from '../pages/Profile'
import UbahProfil from '../pages/UbahProfil'
import Pengaturan from '../pages/Pengaturan'


const Stack = createStackNavigator() 
const profileStack = () => {
  return (
    <Stack.Navigator initialRouteName='Profile' screenOptions={{headerShown: false}}>
      <Stack.Screen component={Profile} name='Profile'/>
      <Stack.Screen component={UbahProfil} name='UbahProfil'/>
      <Stack.Screen component={Pengaturan} name='Pengaturan'/>
    </Stack.Navigator>
  )
}

export default profileStack
