import React, { useEffect } from 'react';
import { View } from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native'
import { useSelector } from 'react-redux';

import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import TopTabNav from './topTabNav';
import Komisi from './komisiTabNav';
import profileStack from './profileStack';
import Statistik from '../pages/Statistik';
import DaftarPengguna from '../pages/DaftarPengguna';

const Tab = createBottomTabNavigator();


const blank = () => <View style={{flex: 1}}/>

const bottomTabNav = ({navigation}) => {
  const user = useSelector(state => state.user)

  useEffect(() => {
    if(user.id == 0){
      navigation.dispatch(CommonActions.reset({
        index: 0,
        routes: [{name: 'Welcome'}]
      }))
    }
  }, [user.id])
  return (
    <Tab.Navigator tabBarOptions={{activeTintColor: '#C1272D', labelStyle: {fontSize: 13}}}>
      <Tab.Screen
        name="Beranda"
        component={TopTabNav}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="time-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Komisi"
        component={Komisi}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="list-outline" size={30} color={color} />
          ),
        }}
      />
      {
        user.role == 1 ?
        <Tab.Screen
          name="DaftarPengguna"
          component={DaftarPengguna}
          options={{
            tabBarLabel: 'Pengguna',
            tabBarIcon: ({color}) => (
              <FontAwesome5 name="users" size={25} color={color} />
            ),
          }}
        />
        : null
      }
      {
        user.role == 0 ?
        <Tab.Screen
          name="TambahPengaduan"
          component={blank}
          options={{
            tabBarLabel: 'Pengaduan',
            tabBarIcon: () => <AntDesign name="pluscircle" size={25} color={'#C1272D'} />,
          }}
          listeners={({navigation}) => ({
            tabPress:  event => {
              event.preventDefault()
              navigation.navigate('Pengaduan')
            }
          })}
        />
        : null
      }
      <Tab.Screen
        name="Statistik"
        component={Statistik}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="stats-chart-outline" size={30} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profil"
        component={profileStack}
        options={{
          tabBarIcon: ({color}) => (
            <Ionicons name="person-outline" size={30} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default bottomTabNav;