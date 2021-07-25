import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {LogBox} from 'react-native';
import axios from 'axios';
import { urlAPI } from '../assets/URLs';

const TopTab = createMaterialTopTabNavigator()

const komisiTabNav = ({navigation}) => {
  LogBox.ignoreAllLogs();

  const [data, setData] = useState(() =>([]))
  const [count, setCount] = useState(() =>([]))

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
      getCount()
    });
    return unsubscribe;
  }, [navigation])

  const getData = () => {
    axios.get(urlAPI + '/partner/getAll')
      .then(res => {
        setData(res.data)
      })
      .catch(err => console.log(err))
  }

  const getCount = () => {
    axios.get(urlAPI + '/complaint/countComplaintByPartner')
    .then(res => {
      setCount(res.data)
    })
    .catch(err => console.log(err))
  }
  
  const renderTopTab = () => {
    // console.log(data[0])
    var view = data.map(key => {
        return <TopTab.Screen key={key.idKomisi} name={key.namaKomisi}>
          {props => <ScrollView {...props} style={styles.container}>
            {
              key.mitraKerja.map(mitra => (
                <TouchableOpacity key={mitra.idMitraKerja} style={styles.itemWrapper} onPress={() => console.log("masuk")}>
                  <Text style={styles.text}>{mitra.namaMitraKerja}</Text>
                  {
                    count.map(count => (
                      count.id_mitra == mitra.idMitraKerja ?
                      <Text style={styles.text}>{count.count}</Text>
                      : null
                    ))
                  }
                </TouchableOpacity>
              ))
            }
          </ScrollView>}
        </TopTab.Screen>
    })
    return view
  }

  return (
    <TopTab.Navigator
      tabBarOptions={{
      activeTintColor: '#C1272D',
      inactiveTintColor: 'black',
      indicatorStyle: {backgroundColor: '#C1272D'},
      labelStyle: {fontSize: 14},
    }}>
      {
        data.length > 0 ? renderTopTab()
        :
        <TopTab.Screen name="LOADING">
          {() => <View><Text>Loading...</Text></View>}
        </TopTab.Screen>
      }
    </TopTab.Navigator>
  )
}

export default komisiTabNav

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  itemWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    marginVertical: 5
  },
  text: {
    fontSize: 16,
  }
})
