import React,{useState,useEffect} from 'react';
import {View,Text,SafeAreaView,StatusBar,FlatList} from 'react-native';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

//date
//amount
//rideId
//userID
//date and time 
// 
//on peut utiliser RideHistoryBlock here to display the payments...

const Item = ({ item,navigation }) => {
  const [itemDetails, setItemDetails] = useState(null);

  return (
<Pressable onPress={() => {
    setItemDetails(item);
    navigation.navigate('paymentDetail',{item:item});
}}>
    <RideHistoryBlock  textTopLeft={item.datetime}  textTopRight={item.price + " FCFA"} textBottomLeft={item.datetime} rating={item.rating}/>
</Pressable>
  );
};


export default function PaymentScreen() {
  const [payments,setPayments] = useState([]);

  var url = '/users/' + auth().currentUser.uid + '/payments';
  useEffect (()=>{
    const reference = database().ref(url);
    reference
            .on('value', snapshot => {
              console.log('snapshot',snapshot);
                if (snapshot.exists()) {
                    // Exist! Do whatever.
                console.log('User data: ', snapshot.val());
                setPayments(Object.values(snapshot.val()));
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
            data={payments}
            renderItem={renderItem}
            keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}