import React, { useEffect,useState ,useRef} from "react"
import { SafeAreaView, StatusBar, StyleSheet,TextInput,View,Modal ,Text,Pressable,PanResponder,Animated,useWindowDimensions,} from "react-native"
import MapView, { PROVIDER_GOOGLE,Marker, Circle } from "react-native-maps"
import { check, request, PERMISSIONS, RESULTS } from "react-native-permissions" //
import Geolocation from "react-native-geolocation-service"
import Geocoder from 'react-native-geocoding';

import MapViewDirections from 'react-native-maps-directions';
import fontKeys from "../../keyText/fontKeys"
import * as turf from "@turf/turf";
import database from "@react-native-firebase/database"
import MatchDriverScreen from "../rider/MatchDriver/MatchDriverScreen"
import auth from '@react-native-firebase/auth';

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
    const [trajectoryDriver, setTrajectoryDriver]= useState([])


    const [featuresCollection,setFeaturesCollection] = useState([]);

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
          //for testing purpose i will set it to yassa ...  Yassa Latitude :   3,9708  Yassa Longitude :   9,8132
          //destination bonanjo  Bonanjo Latitude :   4+0394  Bonanjo Longitude :   9+687
            setLocation({ latitude, longitude });
            database().ref('/drivers/position/')
            .child(auth().currentUser.uid)
            .set ('4+0394,9+687')//(auth().currentUser.uid)
            //.push() //(JSON.stringify(latitude).replace('.','+') +','+JSON.stringify(longitude).replace('.','+'))  

            database().ref('/drivers/availablePl/')
            .child(auth().currentUser.uid)
            .set (5)
            
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

      const neighbors = () =>{

      }
      /*
      1)- envoyer continuellement les coordinates
      2)- dans mon tableau des 10 points, je remplace les points les plus proches... du target points en fonction de la distance qui les separe.... item.geometry.properties.distanceToPoint
      3)- prendre la base sur laquelle on a deja compare ...et comparer aux nouvelles entrees ... si le chauffeur changer de route... il peut se rapprocher de la destination 
      4)-
      
      dans un map on sauvegarde les distances en fonction des target points et puis on filtre juste pour prendre les distances minimales ... 
      // et retourner les nearest .... 
      programmation dynamik...
      sauvegarder les distances 
      */
      function compareDistance(a, b) {
        //properties
        return a.properties.distanceToPoint - b.properties.distanceToPoint;
      }

      /*
      
function savinDataMap (tab, val ){
  let cle =  tab.toString()  + '[' + val + ']';
 return cle;
}

console.log(savinData([1, [1, 1]],[2,3]));

a.set(savinData([1, [1, 1]],[2,3]),0989);
//console.log(a.get(savinData([1, 1, 1],[2,3])))
console.log(a.get(savinData([1, [1, 1]],[2,3])));
      */


function savinDataMap (tab, val ){
  let cle =  tab.toString()  + ';' + val ;
 return cle;
}

const closestPointSol = new Map();


/*


function sortingArray (a,b){
 return a-b;
}

function neighborPointMod(targetPoint,points) {
        // Input validation
        
        let arraySize = points.length<=10? points.length: 10;
        var neighborArray =  new Array(arraySize);
        for (j=0 ; j <neighborArray.length; j++){
          neighborArray[j] =  points[j];
        }
        neighborArray = neighborArray.sort(sortingArray);
        points.slice(arraySize, points.length).map( pt => {
          const distanceToPoint =  Math.abs(targetPoint - pt);

          //neighborArray = neighborArray.sort(compareDistance); //sortng after each point 
          let tempVal = 0; // shift of one case to the right ....
           for (i =0 ; i<neighborArray.length; i++){
             
              console.log("This is the  state of the array at the moment...before condition",neighborArray)
             if (distanceToPoint< Math.abs(targetPoint -neighborArray[i])) {
              //neighborArray.shift();
              neighborArray.splice(i+1,0,pt);
              neighborArray =neighborArray.slice(0,neighborArray.length-1);

              let closest = pt;
             // neighborArray[i] = closest;
              //neighborArray.splice(i,0,pt);
              break;
             } 
           }
          
        });
        return neighborArray;
      }
      
      let testArray = [14,-9,5,33,96,-1,0,75,54,-23,-22];
      //console.log("original array... ", testArray);
      neighborPointMod(0,testArray);

*/

function sortingArray (a,b){
  return a-b;
 }
      function neighborPointMod(
        targetPoint,points) {
         // Input validation
        if (!targetPoint) throw new Error("targetPoint is required");
        if (!points) throw new Error("points is required");
        
        let finalArray = [];
        let arraySize = points.features.length<=10? points.features.length: 10;
        var neighborArray =  new Array(arraySize);
        for (j=0 ; j <neighborArray.length; j++){

          neighborArray[j] = turf.clone(points.features[j]);
          neighborArray[j].properties.featureIndex = j;
          neighborArray[j].properties.distanceToPoint = turf.distance(targetPoint, neighborArray[j]);
        }
        
        neighborArray = neighborArray.sort(compareDistance);
      
        turf.featureEach(points, (pt, featureIndex) => {
          const distanceToPoint = turf.distance(targetPoint, pt);

          for (i =0 ; i<neighborArray.length; i++){
             if (distanceToPoint< neighborArray[i].properties.distanceToPoint) {
              let closest = turf.clone(points.features[featureIndex]);
              closest.properties.featureIndex = featureIndex;
              closest.properties.distanceToPoint = distanceToPoint;
              neighborArray.splice(i,0,closest);
              neighborArray =neighborArray.slice(0,neighborArray.length-1);
              break;
             } 
           }
        });
        return neighborArray;
      }

      function nearestPointMod(
        targetPoint,points) {
        // Input validation
        if (!targetPoint) throw new Error("targetPoint is required");
        if (!points) throw new Error("points is required");
          
        let nearest;
        let minDist = Infinity;
        let bestFeatureIndex = 0;
        
        turf.featureEach(points, (pt, featureIndex) => {
          const distanceToPoint = turf.distance(targetPoint, pt);
           
          if (distanceToPoint < minDist) {
            bestFeatureIndex = featureIndex;
            minDist = distanceToPoint;
          }
        });
        nearest = turf.clone(points.features[bestFeatureIndex]);
        nearest.properties.featureIndex = bestFeatureIndex;
        nearest.properties.distanceToPoint = minDist;
        return nearest;
      }
      /*
      Distance: 244.741 km
[Fri Sep 10 2021 23:24:07.434]  LOG      Duration: 257.25 min
      */

hashCode = s => s.split('').reduce((a,b)=>{a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)


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
          //{{latitude: location.latitude, longitude: location.longitude}}
          // Latitude :     Yassa Longitude :   
               // waypoints={ (trajectoryDriver.length > 2) ? trajectoryDriver.slice(1, -1): undefined}
                origin= {{latitude: 3.9708, longitude: 9.8132}}
                destination={{latitude: 4.0394, longitude: 9.687}}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth ={5}
                strokeColor="black"
                onReady={result => {
                  setDistance(result.distance.toFixed(2))
                  setTiming(result.duration)
                  console.log(`Distance: ${result.distance} km`)
                  console.log(`Duration: ${result.duration} min.`) 
                 // let featurePoints = result.coordinates.map ( element => new Array(element.longitude, element.latitude));
                  
                 var targetAltitude = [9.738832, 4.057143];
                  var targetPoint = turf.point(targetAltitude, {"marker-color": "#0F0"});
                  var points = turf.featureCollection( result.coordinates.map( rslt => turf.point([rslt.longitude,rslt.latitude])))
                  var nearest = nearestPointMod(targetPoint, points);
                  let uid = auth().currentUser.uid;

                  let obj= {
                    [uid]:points
                  }

                  neighborPointMod(targetPoint, points);

                  //ici nous allons sauvegarder les coordonnees .. et non les points....
                  pointsAltitude = result.coordinates.map( rslt => [rslt.latitude,rslt.longitude]);
                  database().ref('/drivers/midPoints/')
                  .child(auth().currentUser.uid)
                  .set(pointsAltitude)
                 /* if (!(savinDataMap(pointsAltitude,targetAltitude) in closestPointSol) ) {
                    closestPointSol.set(savinDataMap(pointsAltitude,targetAltitude),neighborPointMod(targetPoint, points))
                  }
                  closestPointSol.get(savinDataMap(pointsAltitude,targetAltitude))*/

                  console.log("Obj obj obj",nearest)
                   
                  //initialise pour recupere la precedente valeur .... 
                 /* database()
                  .ref('/maps/neighbor')
                  .set({
                    [savinDataMap(pointsAltitude,targetAltitude)]: neighborPointMod(targetPoint, points)
                  })
                  .then(() => console.log('Data set.'));*/
                    let arr = result.coordinates.map( rslt =>  '(' +JSON.stringify(rslt.longitude).replace(".", "+") + ';' +JSON.stringify(rslt.latitude).replace(".", "+") +')' );   
                    let  reducerPoints = arr.reduce((previousValue, currentValue) => previousValue + currentValue)
                    reducerPoints = reducerPoints + `:${targetAltitude}`;
                    console.log(reducerPoints.length);
                    console.log(" reducerPoints reducerPoints  reducerPoints reducerPoints   ",hashCode(reducerPoints)); 
                   
                    let june  = JSON.stringify(hashCode(arr[0]));
                    let trying = "trying";
                    try{

                    }
                    catch(e){}
                     
                    // location/uid/ push set location driver on realtime... push with timestamp ... 
                    // location/targetPoint/ uid : points...
                    // trigger once a request is made... /request/{destinationId}/{uid}
                    // 
                    
                    //
                    database()
                    .ref(`/maps/neighbor/${trying}`)
                    .child(june)
                    .set(neighborPointMod(targetPoint, points));

                  //function(targetPoint) return 
                  console.log ('it is not possible ', location);

                 /* var targetPoint = turf.point([28.965797, 41.010086], {"marker-color": "#0F0"});
                  var points = turf.featureCollection([
                      turf.point([28.973865, 41.011122]),
                      turf.point([28.948459, 41.024204]),
                      turf.point([28.938674, 41.013324])
                  ]);

                  var nearest = turf.nearestPoint(targetPoint, points);
                  console.log("nearest neearest ",nearest);*/
                  //select only taxi that still have seats availabl
                  //allow driver to speficy if they pick up someone other from the app so i will know the exact number of seats available ..
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