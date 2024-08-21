import React,{useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { RootComponent } from './src/views/index';
import { useDispatch } from 'react-redux';

import { Provider as StoreProvider  } from 'react-redux';
import store from './src/store';
import {openStatePost} from "./src/acctions/postActions";

export default function App (props) {
 
    // useEffect(()=>{
    //   const init=async()=>{
    //     const dispatch = useDispatch();
    //     const actions = openStatePost(true);
    //     dispatch(actions);
    //   };
    //   init();
    // },[]);
  return (
    <StoreProvider store={store}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <RootComponent/>
          {/* <RootComponentView/> */}
        </View>
      </SafeAreaView>
    </StoreProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  // backgroundColor: '#fff',
  // alignItems: 'center',
  // justifyContent: 'center',
  }
})
