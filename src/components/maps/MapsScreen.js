import React, { useEffect,useState ,useRef} from "react"
import { SafeAreaView, StatusBar, StyleSheet,TextInput,View,Modal ,Text,Pressable,PanResponder,Animated,useWindowDimensions,} from "react-native"
import MapView, { PROVIDER_GOOGLE,Marker } from "react-native-maps"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions" //
import Geolocation from "react-native-geolocation-service"
import Geocoder from 'react-native-geocoding';

import MapViewDirections from 'react-native-maps-directions';
import fontKeys from "../../keyText/fontKeys"

const GOOGLE_MAPS_API_KEY = 'AIzaSyB6iuVD8X4sEeHAGHY3tmMQRyM_Vyoc3UU';
Geocoder.init(GOOGLE_MAPS_API_KEY, {language: 'en'});

const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};

//code bar for promotion and new products....
const MapsScreen = () => {

    const [location, setLocation] = useState(null) //
    const [textInput, setTextInput] = useState("");
    const [modalVisible, setModalVisible] = useState(true);
    const [myText,setMyText] = useState('I\'m ready to get swiped!');
    const [gestureName,setGestureName] = useState('none');
    const [backgroundColor,setBackgroundColor] = useState('#fff');
    const [distance,setDistance] = useState(0);
    const [timing,setTiming] = useState(0);

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

            //same for revere geocoding 
            /*
            // Search by geo-location (reverse geo-code)
Geocoder.from(41.89, 12.49)
		.then(json => {
        		var addressComponent = json.results[0].address_components[0];
			console.log(addressComponent);
		})
		.catch(error => console.warn(error));
            */
        })
            setLocation({ latitude, longitude })
          },
          error => {
            console.log(error.code, error.message)
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        )
      }, [])

      const onRegionChange = ({latitude, longitude}) => {
        Geocoder.from({
          latitude,
          longitude,
        }).then(res => {
          const {
            formatted_address,
            place_id,
            geometry: {
              location: {lat, lng},
            },
          } = res.results[0];
          
          console.log('formatted_address',place_id);
        });
      };

     /* const APIPlaceAutocomplete = (destination, currentPlace) => {
        const URL = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GOOGLE_MAPS_API_KEY}&input=${destination}&location=${currentPlace.latitude},${currentPlace.longitude}&radius=2000`;
      
        if (destination.length > 0) {
          return fetch(URL)
            .then(resp => resp.json())
            .then (result => console.log('inside resultat of the auto complete search',result))
            ////ici il faut filtrer les valeurs avec la ville et le pays pour diminuer les valeurs envoyer ....  
          // et pour cela on peut prendre les valeur de geocoder comme reference ......   et il faut verifier que le format est le meme cest a dire le nombre de virgule qui separe les villes et les pays est le meme que les resultats qui sont 
          //produits
            .catch(error => error);
        } else {
          return 'No destination Address provided';
        }
      };*/

     /* const onChangeText = (val) =>{
        setTextInput(val);
        APIPlaceAutocomplete(val,location);
      }*/

      function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; // Distance in km
        return d;
      }
      
      function deg2rad(deg) {
        return deg * (Math.PI/180)
      }
      if (location) console.log("voici la distance qui me separe de yaounde",getDistanceFromLatLonInKm(location.latitude,location.longitude,3.866667,11.516667))

      const destination = {latitude: 3.866667, longitude: 11.516667};

      /*
      Distance: 244.741 km
[Fri Sep 10 2021 23:24:07.434]  LOG      Duration: 257.25 min
      */
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      {/*<Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <TextInput
        style={{
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          }}
        onChangeText={onChangeText}
        value={textInput}
      />
          </View>
        </View>
      </Modal>*/}

      {location && (<MapView
        paddingAdjustmentBehavior="automatic" 
        showsMyLocationButton={true} 
        showsBuildings={true} 
        maxZoomLevel={17.5} 
        onRegionChangeComplete={onRegionChange}
        loadingEnabled={true}
        loadingIndicatorColor="#fcb103"
        loadingBackgroundColor="#242f3e"
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
      >   
          <MapViewDirections
                origin={{latitude: location.latitude, longitude: location.longitude}}
                destination={{latitude: 4.061536, longitude: 9.786072}}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth ={5}
                strokeColor="black"
                onReady={result => {
                  setDistance(result.distance.toFixed(2))
                  setTiming(result.duration)
                  console.log(`Distance: ${result.distance} km`)
                  console.log(`Duration: ${result.duration} min.`)   
                }}
            />
            <Marker
        ref={(ref) => { this.marker = ref; }}
        draggable
        onDragEnd={(e) => {console.log('dragEnd', e.nativeEvent.coordinate)}}
        coordinate={destination}
        position={destination}
        /*centerOffset={{ x: -18, y: -60 }}
        anchor={{ x: 0.69, y: 1 }}
        pinColor={COLOR.marker}
        onDragStart={() => this.setMarkerPosition()}*/
      />
      </MapView>
    )}
        {false?<View style={{ position: 'absolute', top: 300, left: 250, right: 50, height: 50, borderWidth: 1 ,borderRadius:10,backgroundColor:'#222222' }}>
          <Text style={{alignSelf:'center',flex:1,color:'white',textAlign:'center',fontFamily:fontKeys.MR,marginTop:15}}>{distance + 'km'}</Text>
        </View>:
        <View style={{ position: 'absolute', top: 300, left: 250, right: 50, height: 40 ,borderRadius:10,backgroundColor:'white' }}>
          <Text style={{alignSelf:'center',flex:1,color:'#222222',textAlign:'center',fontFamily:fontKeys.MR,paddingTop:10,paddingBottom:10,marginHorizontal:10}}>{timing + 'min away'}</Text>
        </View>}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
})

export default MapsScreen