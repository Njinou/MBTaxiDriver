import React,{useEffect,useState} from 'react';
import {View,Text,SafeAreaView,Button} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

export default function SavedScreen() {

  const [user,setUser] = useState (auth().currentUser);
  const [savedPlaces,setSavedPlaces] = useState([]);

  var url = '/users/' + auth().currentUser.uid + '/saved';

  // nombre de fois qu'il aille a un endroit 
  //place id, occurence, time 
  //on peut prendre cela dans  trajet details ...s 
  
 useEffect (()=>{
  const reference = database().ref(url);
  reference
          .on('value', snapshot => {
            console.log('snapshot',snapshot);
              if (snapshot.exists()) {
                  // Exist! Do whatever.
              console.log('User data: ', snapshot.val());
              setSavedPlaces(snapshot.val());
              } else {
                  // Don't exist! Do something.
                  console.log("does not exists has to be")
              }
          });
 },[])

  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
            Saved places!!!!! component to ve developped
      </Text>
      <Button onPress={() =>{
          alert("reading button will come back to it later ")
      }} title="READING" />
      <Text>{savedPlaces.age}</Text>
      <Button onPress={() =>{
          alert ('saving places')
      }} title="saving" />

    </SafeAreaView>
  );
}