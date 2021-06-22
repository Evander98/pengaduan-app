import React, {useEffect} from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import Welcome from '../pages/Welcome';
import Login from '../pages/Login';
import Register from '../pages/Register';
import HomeBottomTab from './bottomTabNav'
import TambahPengaduan from '../pages/TambahPengaduan';
import { useSelector } from 'react-redux';
import SyaratKetentuan from '../pages/SyaratKetentuan';

const Stack = createStackNavigator();

const index = () => {
  const user = useSelector(state => state.user)

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user.id ? "Home" : "Welcome"}
        screenOptions={{
          headerStyle: {backgroundColor: '#C1272D'},
          headerTintColor: 'white',
          headerTitleAlign: 'center'
        }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeBottomTab} options={{headerTitle: 'DPRD Minut'}}/>
        <Stack.Screen name="Pengaduan" component={TambahPengaduan} />
        <Stack.Screen name="SyaratKetentuan" component={SyaratKetentuan} options={{headerTitle: 'Syarat dan Ketentuan'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
