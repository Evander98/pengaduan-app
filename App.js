import React from 'react'
import { StyleSheet, View } from 'react-native'

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from "./src/reducers";

import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

import AsyncStorage from '@react-native-async-storage/async-storage';

import Navigation from './src/navigations'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, reducer)

let store = createStore(persistedReducer)

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <View style={styles.container}>
          <Navigation/>
        </View>
      </PersistGate>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
