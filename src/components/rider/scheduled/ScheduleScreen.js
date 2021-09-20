import React,{useEffect,useState} from 'react';
import {View,Text,SafeAreaView,Button,StatusBar,FlatList,Pressable,StyleSheet} from 'react-native';

import RideHistoryBlock from '../history/RideHistoryBlock';
import fontKeys from '../../../keyText/fontKeys';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


const ComponentBottomRight = (props) =>{
  return (
  <Text style={[styles.topText,{fontFamily:fontKeys.MB}]}> {props.time}</Text>
  )
};
const Item = ({ item,navigation }) => {
  const [itemDetails, setItemDetails] = useState(null);
  return (
<Pressable onPress={() => {
    setItemDetails(item);
    navigation.navigate('scheduledRideDetails',{item:item});
}}>
    <RideHistoryBlock   textTopRight ={item.date}  textTopLeft={item.destination.description} textBottomLeft={item.price? item.price : '2.500 F CFA'}  rating={item.rating} BottomRightComponent={<ComponentBottomRight time={item.time}/>}/>
</Pressable>
  );
};


export default function ScheduleScreen(props) {

  const [scheduledPlaces,setScheduledPlaces] = useState([]);

  var url = '/users/' + auth().currentUser.uid + '/scheduled';

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
            //  setScheduledPlaces(snapshot.val());
              setScheduledPlaces(Object.values(snapshot.val()));
              } else {
                  // Don't exist! Do something.
                  console.log("does not exists has to be")
              }
          });
 },[])

 const renderItem = ({ item }) => (
  <Item item={item} navigation={props.navigation}/>
);

  return (
    <SafeAreaView style={{ flex: 1,
      marginTop: StatusBar.currentHeight || 0,backgroundColor:'white'}} > 
      <FlatList
          data={scheduledPlaces}
          renderItem={renderItem}
          keyExtractor={item => item.id}
    />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  topText:{
      color:'#000000',fontFamily:fontKeys.MR,fontSize:14
  },
});
