import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const list = [
  {
    key: 1,
    title: 'Daftar Anggota',
    linkTo: 'Anggota',
    icon: 'people'
  },
  {
    key: 2,
    title: 'Legislasi',
    linkTo: 'Legislasi',
    icon: 'list'
  },
  {
    key: 3,
    title: 'Naskah Akademik',
    linkTo: 'Naskah',
    icon: 'book-outline'
  },
  {
    key: 4,
    title: 'Berita',
    linkTo: 'Berita',
    icon: 'newspaper-outline'
  },
  {
    key: 5,
    title: 'Agenda',
    linkTo: 'Agenda',
    icon: 'calendar-outline'
  },
  {
    key: 6,
    title: 'Hasil',
    linkTo: 'Hasil',
    icon: 'document-text-outline'
  },
  
]

const Informasi = ({navigation}) => {

  const renderItems = () => {
    return list.map((key, index) => (
      <TouchableOpacity key={index} style={styles.itemWrapper} onPress={() => navigation.navigate(key.linkTo)}>
        <Ionicons name={key.icon} size={45} color='#C1272D'/>
        <Text style={styles.label}>{key.title}</Text>
        <Ionicons name='arrow-forward-circle' size={30} />
      </TouchableOpacity>
    ))
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        {renderItems()}
      </ScrollView>
    </View>
  )
}

export default Informasi

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#DBDBDB'
  },
  itemWrapper: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    marginVertical: 5
  },
  label: {
    fontSize: 18,
  }
})
