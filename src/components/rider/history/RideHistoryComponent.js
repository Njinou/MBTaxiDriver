import React,{useState,useEffect} from 'react';
import {View,Text,StyleSheet,ScrollView,FlatList,SafeAreaView,StatusBar, Pressable} from 'react-native';

import SmallStarComponent from '../../rate/SmallStarComponent';
import TaxiImageText12 from '../../common/TaxiImageText12';
import fontKeys from '../../../keyText/fontKeys';
import RideHistoryBlock from './RideHistoryBlock';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';


const sample = [
    {   
        id:'asdasdasdasd',
        price : 1000,
        rating:4,
        datetime:new Date(),
        driverName:'Jonas'
        //topBottom = item.rating for a ride
        // textTopLeft = item.datetime
        //textBottomLeft = item.driverName
    },

  ];

  //item.id 
// textTopRight = item.price + " FCFA"
//topBottom = item.rating for a ride
// textTopLeft = item.datetime
//textBottomLeft = item.driverName

// si on clique dessus on met item.departure.location departure.time 
//departure {time , pickup }
//arrival {time , pickup }
//duration of the traject
//cost
//riders

//TRANSFORM IN in string once saving it and just returning the value .... to display ... 
  const Item = ({ item,navigation }) => {
      const [itemDetails, setItemDetails] = useState(null);

      return (
    <Pressable onPress={() => {
        setItemDetails(item);
        navigation.navigate('historyDetails',{item:item});
    }}>
        
        <RideHistoryBlock  textTopLeft={item.datetime}  textTopRight={item.price + " FCFA"} textBottomLeft={item.datetime} rating={item.rating}/>
    </Pressable>
      );
  };

const RideHistoryComponent = (props) => {
    const [history,setHistory] = useState([]);
    const [errorLoadingData,setErrorLoadingData] = useState("");
    var url = '/users/' + auth().currentUser.uid + '/history';

    useEffect (()=>{
        const reference = database().ref(url);
        reference
                .on('value', snapshot => {
                    if (snapshot.exists()) {
                        // Exist! Do whatever.
                    console.log('User data: ', snapshot.val());
                    setHistory(Object.values(snapshot.val()));
                    } else {
                        // Don't exist! Do something.
                        console.log("does not exists has to be")
                    }
                });
       },[])

    const renderItem = ({ item }) => (
        <Item item={item} navigation={props.navigation}/>
    );

    const event = new Date();

    return (
      <SafeAreaView style={{ flex: 1,
        marginTop: StatusBar.currentHeight || 0,backgroundColor:'white'}} > 
        <FlatList
            data={history}
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

export default RideHistoryComponent;
              