
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState,useEffect } from 'react';
import {StyleSheet,View,Image,ImageBackground, ScrollView,Text,TextInput,FlatList, Pressable, Button} from 'react-native';

import fontKeys from '../../../keyText/fontKeys';
import imageKeys from '../../../keyText/imageKeys';

import textKeys from '../../../keyText/textKeys';

import TaxiButton from '../../common/TaxiButton'
import TaxiTextInput from '../../common/TaxiTextInput'
import TaxiText from  '../../common/TaxiText';
import TaxiImageText from '../../common/TaxiImageText';
import TaxiImageText12 from '../../common/TaxiImageText12';
import TaxiImageTextInput from '../../common/TaxiImageTextInput';
import RideOtherOptions from '../../rider/rideOptions/RideOtherOptions';
import Geolocation from "react-native-geolocation-service"
import Geocoder from 'react-native-geocoding';
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions" //
import RatingScreen from '../../rate/RatingScreen';
import database from '@react-native-firebase/database';
import DestinationInputComp from '../../common/DestinationInputComp';

import { Value } from 'react-native-reanimated';

import auth from '@react-native-firebase/auth';


const GOOGLE_MAPS_API_KEY = 'AIzaSyB6iuVD8X4sEeHAGHY3tmMQRyM_Vyoc3UU';
//DANS SCHEDULE RIDE IL PEUT CHOISIR LE POINT DE PICK UP 
//IL FAUT IMPOSER D'ACTIVER L'AUTORISATION  de la position pour permettre a l'utilisateur de pouvoir utiliser lappli sinon on ne pourra pas afficher le message d'erreuur au niveau de la destination et le point de depart 

function compareString (str1,str2){
  var words1 = str1.split(/\s+/g),
   words2 = str2.split(/\s+/g),
   i,
   j;
  var total =0;

for (i = 0; i < words1.length; i++) {
   for (j = 0; j < words2.length; j++) {
       if (words1[i].toLowerCase() == words2[j].toLowerCase()) {
       //   console.log('word '+words1[i]+' was found in both strings');
          total++;
       }
   }
}
return total;
}

const HomeRiderDestinationScreen: (props) => React$Node = (props) => {
    const [destination,setDestination] = useState(null);
    const [isSearchingAddress,setIsSearchingAddress] = useState(true);
    const [value,setValue] = useState(null);
    const [insertDestinationValue,setInsertDestinationValue] = useState(false);
    const [location, setLocation] = useState(null) //
    const [locationAddress, setLocationAddress] = useState(null) //
    const [textInput, setTextInput] = useState("");
    const [error, setError] = useState(null);
    const [data,setData] = useState([]);
    const [option,setOption] = useState(false);
    const [optionValue,setOptionValue] = useState(null);
    const [currentAddress,setCurrentAddress] = useState("");
    const [phoneNumber,setPhoneNumber] = useState('');
    const [openingRating,setOpeningRating] = useState(false);
    const getPhoneNumber = (val) =>  {setPhoneNumber(val); console.log(val) }
    const [isPhonNumberSaved,setIsPhoneNumberSaved]= useState(auth().currentUser.phoneNumber);
    const [maLocation,setMaLocation] = useState(null);
    const [maDestination,setMaDestination] =useState(null);

    getMalocation =(val) => console.log("ma location DATA ",data);//setMaLocation (val)
    getMaDestination =(val) =>  console.log("Destination");//setMaDestination (val)
    
    console.log(" Here are the values.... maLocation ",maLocation);
    console.log (" there it is ... maDestination ",maDestination);

    const handleLocationPermission = async () => { 
        let permissionCheck = ""
        if (Platform.OS === "ios") {
          permissionCheck = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
    
          if (permissionCheck === RESULTS.DENIED) {
            const permissionRequest = await request(
              PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
            )
            permissionRequest === RESULTS.GRANTED
              ? console.warn("Location permission granted.")
              : console.warn("Location perrmission denied.")
          }
        }
    
        if (Platform.OS === "android") {
          permissionCheck = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
    
          if (permissionCheck === RESULTS.DENIED) {
            const permissionRequest = await request(
              PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
            )
            permissionRequest === RESULTS.GRANTED
              ? console.warn("Location permission granted.")
              : console.warn("Location perrmission denied.")
          }
        }
      }
     
      useEffect(() => {
        handleLocationPermission()
      }, [])

      useEffect (()=>{
       
        const url = 'users/' + auth().currentUser.uid ;
      
        const reference = database().ref(url);
        reference
                .child ('history')
                .orderByKey()
               .limitToLast(1)
                .once('value', snapshot => {
                    if (snapshot.exists()) {
                        // Exist! Do whatever.
                   let elmnt = Object.values(snapshot.val())[0];
                   //testing the water to see if 
                   elmnt.hasOwnProperty('rate') ? setOpeningRating(false): setOpeningRating(true);
    
                 } else {
                      console.log(" DANS LE COMPOSANT HOME ROUTE ...   does not exists has to be")
                      setOpeningRating(false)
                     // setOpeningRating(true)
                    }
                });
      },[])


      useEffect(() => { 
        Geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords
              // We use Geocoder.from function to pass our current location.
        Geocoder.from({
            latitude: latitude,
            longitude: longitude,
          }).then(res => {
            // Destructure the response
            const {
              formatted_address,
              place_id,
              geometry: {
                location: {lat, lng},
              },
            } = res.results[0];
            setCurrentAddress(formatted_address);
            setLocationAddress(res.results[0]);
            //same for revere geocoding 
            
            // Search by geo-location (reverse geo-code)
      /*Geocoder.from(location)
		.then(json => {
        		var addressComponent = json.results[0].address_components[0];
			console.log('addressComponent .........??????????????!!!!!',addressComponent);
		})
		.catch(error => console.warn(error));*/
            
        })
            setLocation({ latitude, longitude })
          },
          error => {
            console.log(error.code, error.message)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
      }, [])
 const setModalFunc = (val) => {setOption(false); props.navigation.navigate('dest2',{ option:val,destination:value,location:locationAddress,currentPosition:location },); setOptionValue(val); } //va dans option ride 

     APIPlaceAutocomplete = (destination, currentPlace) => {
       const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAPS_API_KEY}&input=${destination}&location=${currentPlace.latitude},${currentPlace.longitude}&radius=2000`;
        if (destination.length > 0) {
          return fetch(URL)
            .then(resp => resp.json())
            .then (result => {
              let localAddress = result.predictions.filter( element => compareString(element.description, currentAddress)>1);
              setData(localAddress); //(result.predictions);
            // setData (result.predictions);
            }) // compareString 
            //result.predictions.filter( element => compareString(element, currentAddress)) 
            ////ici il faut filtrer les valeurs avec la ville et le pays pour diminuer les valeurs envoyer ....  
          // et pour cela on peut prendre les valeur de geocoder comme reference ......   et il faut verifier que le format est le meme cest a dire le nombre de virgule qui separe les villes et les pays est le meme que les resultats qui sont 
          //produits
            .catch(error => console.log('voici l\'erreur ',setError(error)));
        } else {
            console.log("No address corresponding ..")
          return 'No destination Address provided';
        }
      };

      const onChangeText = (val) =>{
       // setInsertDestinationValue(false);
       setIsSearchingAddress(true);
        setTextInput(val);
     APIPlaceAutocomplete(val,location);
      }
      onSubmitEditing = () =>{
        console.log('On submit Editing');
        //setOption(true);
       // props.navigation.navigate('riderDestination');
      }
      // console.log("this is the item that has been pressed",item)
      const renderItem = ({ item }) => (
        <Item item={item} />
      );
      const Item = ({ item}) => (
        <Pressable onPress={() =>  {
          //setInsertDestinationValue(true);
          setIsSearchingAddress(false);
          setValue(item);

          setData([]);
          //setTimeout(function(){ props.navigation.navigate('option') }, 1000);
          setOption(true);
          //props.navigation.navigate('riderDestination');
          }}>
          <View style={{backgroundColor:'white',borderBottomLeftRadius:8,borderBottomRightRadius:8}}>
            <TaxiImageText12 
                image={imageKeys.stayyellow} 
                text={textKeys.destination} 
                text1={item.place_id}
                text2= {item.description}
            />
          </View>
        </Pressable>
      );

    
      savingComment =() => {
        console.log("oh well...")
        setOpeningRating(false)
       // setOpeningRating(!openingRatingModal);
       props.closingRatingModalFunc();
      }



   // const actionCodeInfo =  auth().checkActionCode('ABCD');
    //console.log('Action code operation: ', actionCodeInfo.operation);
    // <DestinationInputComp  getMaDestination={getMaDestination} getMalocation={getMalocation}/>

    //<DestinationInputComp/>
  if (error) return null;
  if (location) {   return (
    <View style={{height:'100%'}}>
       <ImageBackground source={imageKeys.map} style={styles.image}>
         <View>
         
         </View>
         <View style={{flex:1}}>     
         </View>
            <View style={{marginLeft:20,marginRight:15, }}> 
                  {props.option || option ? < RideOtherOptions setModalVisible={option} func={setModalFunc}/> :<>
                  <TaxiImageTextInput  
                        style={{
                        backgroundColor:'white',
                        alignItems:'center',
                        textAlign:'center',
                        marginBottom:1,
                        borderTopLeftRadius:8,
                        borderTopRightRadius:8,
                        shadowColor: 'rgba(170,170,170,0.5)',//'rgba(170,170,170,0.5)',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 2,
                        shadowRadius:8,
                        elevation:50,
                        flexWrap:'nowrap',alignSelf:'stretch',
                        width:'100%',
                        marginTop:20,
                        }} 
                        imageStyle={{marginRight:22}} 
                        image={imageKeys.taxisearch} 
                        placeholder={textKeys.destination}
                        inputStyle={{borderWidth:0,marginRight:24,marginTop :17,
                        }}
                        func={onChangeText}
                        onSubmitEditing={onSubmitEditing}
                        value= {isSearchingAddress? textInput :  value.description.split(',')[0]}
                    /> 
                     <FlatList
                        data={data}
                        renderItem={renderItem}
                        keyExtractor={item => item.place_id}
                    />

                <ScrollView 
                    style={{
                        backgroundColor:'white',
                        borderBottomLeftRadius:8,
                        borderBottomRightRadius:8,
                    }}
                >
                   
                </ScrollView>
                  </>}
                <Image source={imageKeys.yourlocation} style={{marginTop:props.option? 'auto':80,alignSelf:'flex-end',marginRight:60,marginBottom:41}} />
                <Image source={imageKeys.taxi} style={{alignSelf:'flex-end',marginRight:'33%',marginBottom:36}} />
                <Image source={imageKeys.taxi} style={{marginLeft:66,marginBottom:'auto',transform: [{ rotate: "90deg" }]}} />
              
            </View>
            
            {props.option  || option ? null:
            <>
                <View style={{ marginTop:'auto',alignItems:'center',justifyContent:'center',flexDirection:'row', alignSelf:'flex-end'}}>
                        <View style={{borderStyle:'solid',borderColor:'#000000',borderWidth:1,flex:1,marginLeft:'30%',margin:5}}/>
                        <Text style={{fontSize:14,fontFamily:fontKeys.MR,color:'#000000'}}>
                            {textKeys.or}
                        </Text>
                        <View style={{borderStyle:'solid',borderColor:'#000000',borderWidth:1,flex:1,marginRight:'30%',margin:5}}/>
                </View>
                
                <TaxiText 
                    style={{
                    //  marginTop:'auto',
                        alignSelf:'stretch',
                        marginLeft:17,
                        marginRight:15,
                        marginBottom:20,
                        borderBottomRightRadius:8,
                        shadowColor: 'rgba(170,170,170,0.5)',
                        shadowOffset:(0,2),
                        shadowOpacity:22,
                        shadowRadius:8,
                        backgroundColor:'white',
                        borderRadius:8
                    }} 
                    styleText={{
                        color:'#000000',
                        borderWidth:0,
                        fontFamily:fontKeys.MR,
                        padding:13,
                        textAlign:'center',
                        fontSize:14
                    }} 

                    text={textKeys.rider.request.taxiOption}   
                />
            </>}
               
            <View 
                style={{
                    marginTop: props.option? 'auto': null,
                    justifyContent:'space-between',
                    flexDirection:'row',
                    paddingLeft:54,
                    paddingRight:46,
                   // marginTop:'auto',
                    backgroundColor:'#222222',
                    shadowOffset:(0,-1),
                    shadowColor:'rgba(0,0,0,0.09)',
                    shadowOpacity:4,
                   // marginBottom:30
                }}

            >   
                <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Image  source={imageKeys.requesttaxiyellow}/>
                    <Text style={{color:'#F2B84D',fontSize:10,textShadowColor:'#F2B84D',textShadowRadius:1,fontFamily:fontKeys.MSB}}>{textKeys.rider.request.request}</Text>
                </View>
                
                <View style={{alignItems:'center',justifyContent:'center',paddingBottom:10,paddingTop:10}}>
                    <Image  source={imageKeys.scheduledridesgrey} />
                    <Text style={{color:'#C3C1C1',fontSize:10,fontFamily:fontKeys.MSB}}>{textKeys.rider.request.schedule}</Text>
                </View> 
            </View> 
            {
                isPhonNumberSaved? null : <RatingScreen noRate={true}  placeholder="enter number here" text="Enter your Phone Number"  textButton="SEND CODE" getComment={getPhoneNumber}  comment={phoneNumber}  setVisibleFunc={()=> setOpeningRating(false)} openingModal={openingRating}  />
            }
            {openingRating && <RatingScreen 
              openingModal={openingRating} 
              setVisibleFunc={savingComment} 
              rate={props.rate}
              settingRating={props.settingRating}
              comment={props.comment}
              getComment= {props.getComment}
              />   }      
        </ImageBackground>
    </View>
  );
            }
  else return null
};

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
      //  justifyContent: "center",
        alignSelf:'stretch',
        backgroundColor:'white',
      },
});

export default HomeRiderDestinationScreen;

