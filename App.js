import 'react-native-gesture-handler';
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect,useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  AppState,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import fontKeys from './src/keyText/fontKeys';
import imageKeys from './src/keyText/imageKeys';

import LoginRoute from './src/routes/LoginRoute';
import HomeRoute from './src/routes/HomeRoute';
 
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

import DestinationInputComp from './src/components/common/DestinationInputComp';

import { NavigationContainer } from '@react-navigation/native';

const App: () => React$Node = () => {

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();


   // Handle user state changes
   function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }


  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    AppState.addEventListener("change", _handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", _handleAppStateChange);
    };
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if (
      appState.current.match(/inactive|background/) &&
      nextAppState === "active"
    ) {
      console.log("App has come to the foreground!");
    }

    appState.current = nextAppState;
    setAppStateVisible(appState.current);
    console.log("AppState", appState.current);
  };
//signup Cree avec numero de telephone ... on peut meme send le code ici... 
//au lieu de Home ... on peut chercher a confirmer le code .... dans Home ... si le code nest pas verifie... 
//sil nya pas de numero de telephone on met le modal ... 

//return <DestinationInputComp/>

    if (initializing) return <ActivityIndicator size="large" color="#00ff00" />; 
      if (!user) {
        return (
          <NavigationContainer>
            <LoginRoute/>
          </NavigationContainer>
        );
      }
    
      return (
        
        <NavigationContainer>
          <HomeRoute/>
        </NavigationContainer>
       
      );
};

const styles = StyleSheet.create({
 arrowDown: {
    borderTopWidth: 66,
    borderRightWidth: 180,
    borderBottomWidth: 0,
    borderLeftWidth: 180,
    borderTopColor: '#F2B84D',
   // backgroundColor:  'transparent',//'#F2B84D',
    borderRightColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    marginBottom:21,
    zIndex:0,
   
},
triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
},
driver: {
  textAlign:'center',
  fontSize:20.5,
  fontFamily:fontKeys.MR,
  fontWeight:'bold',
  fontStyle:'italic',
},
driverDot: {
  alignSelf:'flex-start',
  fontSize:15.5,
  fontFamily:fontKeys.MR,
  fontWeight:'bold',
  fontStyle:'italic'
},
password:{
  marginTop:73,
  marginBottom:32
},
passwordText:{
  color:'#A3A1A1',
  fontSize:12,
  fontFamily:fontKeys.MSB
},
image: {
  //flex: 1,
  resizeMode: "cover",
  justifyContent: "center",
  alignSelf:'stretch'
},

});

export default App;
