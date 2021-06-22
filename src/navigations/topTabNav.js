import React from 'react';
import {LogBox} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';

import DaftarPengaduan from '../pages/DaftarPengaduan';
import Aspirasi from '../pages/Aspirasi';
import Informasi from '../pages/Informasi';
import pengaduanStack from './pengaduanStack';
import informasiStack from './informasiStack';

const TopTab = createMaterialTopTabNavigator();

const topTabNav = () => {
  LogBox.ignoreAllLogs();
  return (
    <TopTab.Navigator
      tabBarOptions={{
        activeTintColor: '#C1272D',
        inactiveTintColor: 'black',
        indicatorStyle: {backgroundColor: '#C1272D'},
        labelStyle: {fontSize: 14},
      }}>
      {/* <TopTab.Screen name="Pengaduan" component={DaftarPengaduan} /> */}
      <TopTab.Screen name="Pengaduan" component={pengaduanStack} />
      {/* <TopTab.Screen name="Aspirasi" component={Aspirasi} /> */}
      <TopTab.Screen name="Informasi" component={informasiStack} />
    </TopTab.Navigator>
  );
};

export default topTabNav;
