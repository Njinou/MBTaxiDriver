import React, { useState,useEffect } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View, ScrollView,Image, SafeAreaView, FlatList,TextInput} from "react-native";

import fontKeys from '../../../keyText/fontKeys';
import textKeys from '../../../keyText/textKeys';
import TaxiTextInput from '../../common/TaxiTextInput';
import TaxiText from  '../../common/TaxiText';
import TaxiImageText from '../../common/TaxiImageText';
import TaxiText12Row from '../../common/TaxiText12Row';
import TaxiImageTextInput from '../../common/TaxiImageTextInput';
import TaxiButton from '../../common/TaxiButton';
import MatchDriverScreen from '../MatchDriver/MatchDriverScreen';
import RideDetailsScreen from '../rideDetails/RideDetailsScreen';
import DisplayFareScreen from '../fare/DisplayFareScreen';

import Rate from '../../rate/Rate';
import imageKeys from "../../../keyText/imageKeys";

import RideHistoryBlock from '../history/RideHistoryBlock';
import auth from '@react-native-firebase/auth';
import {Picker} from '@react-native-picker/picker';



const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    matricule: 'matricule ',
    driverID: 'driverId ',
    nbrePlacesDisponible: 5,
    pu: '250',
    taxiType:'Taxi',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    matricule: 'matricule ',
    driverID: 'driverId ',
    nbrePlacesDisponible: 2,
    pu: '300',
    taxiType:'Moto-Taxi',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    matricule: 'matricule ',
    driverID: 'driverId ',
    nbrePlacesDisponible: 20,
    pu: '250',
    taxiType:'Clando-Bus',
  },
];

const PriceMoto =(props)=> {
  return (
    <View style={[{flex:1,justifyContent:'space-between',flexDirection:'row',paddingTop:29},props.style]}>
      <View style={{flex:1,flexDirection:'column'}}>
        {props.componentTopLeft? props.componentTopLeft: <Text style={[{color:'#000000',fontSize:16,fontFamily:fontKeys.MR,},props.styleBottomLeft]}> {props.textTopLeft} </Text>}
        {props.componentBottomLeft? props.componentbottomLeft:<Text style={[{paddingBottom:22,color:'#878787',fontSize:12,fontFamily:fontKeys.MR},props.styleBottomLeft]}> {props.textBottomLeft} </Text>}
      </View>
      <View >
      {props.componentTopRight? props.componentTopRight: <Text style={[{paddingRight:21,color:'#3F4D5F',fontSize:18,fontFamily:fontKeys.MR},props.styleTopRight]}> {props.textTopRight} </Text>}
      
      </View>
  </View>)
}

const PriceViewRight = () =>{
  return (
    <View style={{flex:1,alignSelf:'center',alignItems:'flex-start',justifyContent:'center'}}>
        <Text style={{color:'red',fontSize:20,textAlign:'center'}}>
        ready!!! ready!!!!
      </Text>
    </View>
    
  );
}

const MotoPicket = () =>{
  return (
    null
  );
}
//chaque taxi a son prix unitaire  item.pu

//item.matricule
//item.driverID
//item.nbrePlaces
//item.pu
//item.taxiType

// check if nbrePeople > nbrePlaces
// anticiper et mettre le nombre de people disponible  = nmbre place au max... 
const SelectTaxiTypeScreen = (props) => {


  let objInit = {...DATA[0]}
  objInit.nbrePeople = 1;
  objInit.prixTotal = DATA[0].pu;
  objInit.bid= bid
  objInit.price =  DATA[0].pu;
   

    const [modalVisible, setModalVisible] = useState(false);
    const [isSearching,setIsSearching] = useState(false); 
    const [input,setInput] = useState(null); 
    const [selectedPeople, setSelectedPeople] = useState(1);
    const [selectedTaxi,setSelectedTaxi] = useState(DATA[0]); //data[0]
    const [data,setData] = useState(DATA);
    const [prixUnitaire,setPrixUnitaire]  = useState(250);
    const [prixTotal,setPrixTotal]  = useState(prixUnitaire);
    const [bid,setBidding]  = useState(false);
    const [matchingDriver,setMatchingDriver] = useState(false);
    const [driverMatched,setDriverMatched] = useState(false);
    const [openModal,setOpenModal] = useState(false);
    const [rideDetails,setRideDetails] = useState(objInit);

    const [copayer,setCopayer] = useState([
      auth().currentUser
   ]);
    const [cashValue,setCashValue] = useState (0);
    const [mesombValue,setMesombValue] = useState (prixTotal);
    const [user,setUser] = useState (auth().currentUser);
    const [pu,setPu] = useState ((prixTotal/copayer.length).toFixed(2));
   
    const [inputs,setInputs] = useState([]);
    const [inputsTrueFalse,setInputsTrueFalse] = useState([]);


    const [updatePrice,setUpdatePrice] = useState((prixTotal/copayer.length).toFixed(2));

    gettingNewPriceVal = (val,index)=>  {
      console.log('this is the index number...',index)
      let temps =  [...inputs];
      temps[index] = val;
      setInputs(temps);
      let tempTrueF = [...inputsTrueFalse];
      tempTrueF[index] =true;
      setInputsTrueFalse (tempTrueF);
    }

    useEffect ( ()=>{
    let withPrice = copayer.map (rslt => {
      let tmp = rslt;
      tmp.price = prixTotal/copayer.length;
      return tmp;
    })
    setCopayer (withPrice) ;
   },[])

    gettingUpdatePrice = (price) => {
  //  setUpdatePrice[item.uid] = price;
      setUpdatePrice(price);
    }
    gettingCopayer =(val) => {
       let withPrice = val.map (rslt => {
        let tmp = rslt;
        tmp.price = prixTotal/val.length;
        return tmp;
      })
      setCopayer (withPrice) ;//(val);
      /*if ( cop && Array.isArray(cop)){
        let PromiseCopayer = val.map( cop =>  mesombPayment(cop))
        Promise.all(PromiseCopayer).then(values => {
          console.log(values);
        });
      }*/  
    }
    settingCashValue = (val) =>  {
      setCashValue(val); 
      setMesombValue(prixTotal - val);
    } 
    closingModal = () => {
      let valeurPrixTotal = copayer.reduce((a, b,key) => { if (inputsTrueFalse[key]) return (a + parseInt(inputs[key])); return (a + b.price);}, 0);
      console.log("Voici la valeur totale apres... les modifications .. de la chose..  ",valeurPrixTotal);
      if (valeurPrixTotal  != prixTotal) {
        alert("Le prix ajuste ne correspond pas aux prix total")
      }else {
        Alert.alert(
          "Confirmation des Frais",
          "Voulez vous appliquer les differents montants aux utilisateurs choisis",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"
            },
            { text: "OK", onPress: () => {

              let updateCopayerList = copayer.map( (element,key) => {
                let obj= element
                obj.price =  parseInt(inputs[key]);//inputsTrueFalse[key]? parseInt(inputs[key]) :element.price ;
               // console.log( "in obj price this is the value... ",obj.price);
                return obj;
              })
              console.log("Hwlllo update price ... and shit...",updateCopayerList)
              //(updateCopayerList);
            } }
          ]
        );
      }

      setOpenModal(false);
    }


    updatePriceCopayer = (item,newPrice)=>{
      //if (newPrice >props.rideDetails.prixTotal)
      // UPDATE QUAND L''UTILISATEUR A FINI SES MODIFICATIONS... ET EST SUR LE POINT DE SOUMETTRE SA REQUETTE ET LA NOUS POUVONS LA VALIDER SELON K LE TOTAL CORRESPONDE AU PRIC TOTAL.
      //IL nous faut donc un tableau qui recupere ces valeurs...
      /*let valeurPrixTotal = props.copayer.reduce((a, b) => { if (b.uid === item.uid) return (a + newPrice); return (a + b.price);}, 0);
      if (valeurPrixTotal ===  props.rideDetails.prixTotal){
        props.gettingUpdatePrice(newPrice);
        let obj= item;
        obj.price = newPrice; 
       
        let updateCopayerList = props.copayer.map( element => {
          if (element.uid === item.uid) return obj;
          return element;
        })
        props.gettingCopayer(updateCopayerList);
      }else {
        alert("Le prix total sera change si vous apporter cette modification.....")
      }
*/
    }


    const  bidding = (val) =>  {setPrixTotal(val); setBidding(true); setMesombValue(val-cashValue)}
    const openingSplitPaymentModal = () =>  {
      setOpenModal(true); 
      let obj = selectedTaxi;
     obj.nbrePeople = selectedPeople;
     obj.prixTotal = prixTotal;
     obj.bid= bid
     setPu (prixTotal/copayer.length ? (prixTotal/copayer.length).toFixed(2) :0);
     obj.price =  prixTotal/copayer.length ? (prixTotal/copayer.length).toFixed(2) :0;
      
     setRideDetails(obj);
     console.log(' the obj value for the total price ',obj);
    }

    const closingSplitPaymentModal = () =>  {
      setOpenModal(false); 
    }


   //setDriverMatched (true) once driver is found
  /* useEffect ( ()=>{
    //FETCHING DATA FROM FIREBASE...
    //setSelectedTaxi(data[0])
    setSelectedTaxi(DATA[0])
  })*/

  //copayer.map (cop => mesombPayment(cop))

const operateur ={
  MTN:['650','651','652','653','654','67X','680'],
  ORANGE : ['655','656','657','658','659','69X'],
  NEXTEL : ['66X'],
  CAMTEL:['222','233','242','243'],
}

let numer = '237672634842';
 const getOperateur =(nbre)=>{
  let Premier = nbre.charAt(0) === '+' ? nbre.substring(4,5) : nbre.substring(3,4);
  let deuxPremier = nbre.charAt(0) === '+' ? nbre.substring(4,6) : nbre.substring(3,5);
  let troisPremier =  nbre.charAt(0) === '+' ? nbre.substring(4,7) : nbre.substring(3,6);

  if (Premier === "2") return "CAMTEL" 
  switch (deuxPremier){
    case "66":  return "NEXTEL";
    case "69": return "ORANGE";
    case "67": return "MTN";
    default:
  }
  switch (true){
    case operateur.MTN.includes(troisPremier): return "MTN";
    case operateur.ORANGE.includes(troisPremier): return "ORANGE";
    case operateur.NEXTEL.includes(troisPremier): return "NEXTEL";
    case operateur.CAMTEL.includes(troisPremier): return "CAMTEL";

    default:
      return "UNKNOWN OPERATOR";
  }
 }

const mesombPayment = async (obj) => {
  try{
    fetch('https://mesomb.hachther.com/api/v1.0/payment/online/',{
     method: 'POST',
     headers: {
     'X-MeSomb-Application': 'be6190b6ba9506f2dfd6abeb9a02aa98fe02247c',
     'User-Agent' : 'Mozilla',
     Accept: 'application/json',
     'Content-Type': 'application/json',
     },
     body: JSON.stringify({
         amount : mesombValue,//100,
       payer : obj.phoneNumber.substring(1),//'237696603582',//obj.phoneNumber.substring(1),// '237672634842',//'237696603582',//'237400001019',
       fees:true,
       service : getOperateur(obj.phoneNumber),//'MTN',//'ORANGE', //MTN
       currency : 'XAF',
       message : `You are paying for your ride with MBTaxi the amount of ${mesombValue} please approve the request to secure your taxi`
       })
   }).then(  response=>  { 
      console.log("response provided by mesomb shall be",response); 
      if (obj.status=== 200){
        console.log("the transaction was very successful....");
    } 
  })
   .catch(error => console.log('mesomb messing my day up',error))
 }
 //)} 

 catch (error) {
   console.error('error in mesomb payment ',error);
 } finally {
   console.log(false);
 }
}
/*
firebase
  .database()
  .ref('users')
  .orderByChild('emailAddress')
  .equalTo(email)
  .once('value', snap => console.log(snap.val()));
*/
   requestRide = () =>{ 
     let obj = selectedTaxi;
     obj.nbrePeople = selectedPeople;
     obj.prixTotal = prixTotal;
     obj.bid= bid
     setRideDetails(obj);

     console.log(obj);
     setTimeout(function(){setMatchingDriver(true); }, 1500); //AUTOMATIC TO BE CHANGED
     setTimeout(function(){setMatchingDriver(false);  setDriverMatched(true)}, 3000);
   }

    const ViewPrice = (item) =>{
      return (
        <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
          <Image source={imageKeys.greenfilledcheck} style={{marginRight:5}}/>
          <View >
            <Text style={{fontSize:16,color:'#000000',fontFamily:fontKeys.MR}}>
              {item.taxiType? item.taxiType: 'Taxi'} 
            </Text>
            <Text  style={{fontSize:12,color:'#878787',fontFamily:fontKeys.MR}}>
              {selectedPeople >1 ? selectedPeople + ' People':  selectedPeople + ' Person'}
            </Text>
          </View>
         </View>
      )
    }

    const Item = ({ item }) => (
      <Pressable onPress={ ()=>  {setSelectedTaxi(item); setPrixUnitaire(item.pu); setPrixTotal(selectedPeople * item.pu);setMesombValue (selectedPeople * item.pu - cashValue) }}>
       {item.id === selectedTaxi?.id ? < PriceMoto componentTopLeft={<ViewPrice item={item}/>} textBottomLeft={<MotoPicket/>} textTopRight={item.pu} 
                 style={{flex:1,alignItems:'center'}}
                 styleTopRight={{color:'#3F4D5F',marginBottom:50,fontSize:18,fontFamily:fontKeys.MR,}}
      /> : < PriceMoto textTopLeft={item.taxiType}  textBottomLeft={selectedPeople >1 ? selectedPeople + ' People':  selectedPeople + ' Person'}  textTopRight={item.pu}  /> } 
      </Pressable>
      
    );
    
    const renderItem = ({ item }) => (
      <Item item={item} />
    );


     setVisibleFunc = () =>  setModalVisible(!modalVisible);
     
     getTextInput = (val) =>  {
                                setInput (val);
                                val.length >0 ? setIsSearching(true) : setIsSearching(false);
                            }

    /*
    <TaxiImageText 
                    image={imageKeys.plusgreen} 
                    style={{borderStyle:'solid',
                            borderBottomColor:'rgba(170,170,170,0.5)',
                            borderBottomWidth:1,
                            alignItems:'center',
                            marginTop:23,
                            paddingLeft:100,
                    }} 
                    text={textKeys.rider.address.who} 
                    textStyle={{color:'#5BE39B',fontSize:14,fontFamily:fontKeys.MR}}
                    func={()=>props.func("you and you ", {photoURL:'https://reactnative.dev/img/tiny_logo.png',displayName:'test once', uid:123314242432})}
                />

    */
   //BottomRightComponent
//rider select size

/*

<TaxiText func={openingSplitPaymentModal} 
              styleText={{color:'#5BE39B',fontSize:16,fontFamily:fontKeys.MR}}  
              text="Mesomb solution here to be integrated today ... 
              Verifier le paiment avant d'activer le bouton pour eviter les requetes inutiles"
            />
*/
//openingSplitPaymentModal

if (driverMatched) return <RideDetailsScreen />
//useEffect or function to match the driver..... 
if (matchingDriver) return (
  <MatchDriverScreen/>
);
  return (
        <SafeAreaView  style={{flex:1}}>
        <ScrollView  style={{flex:1,paddingHorizontal:22,}}>
            <TaxiImageText image={imageKeys.taxisearch} text={textKeys.rider.select.size}  
            style={{
              flex:1,
                marginLeft:20,borderBottomColor:'#EAEAEA',borderBottomStyle:'solid',
                borderBottomWidth:1,width:'100%',
                alignSelf:'center',
                shadowColor: 'red',//'rgba(170,170,170,0.5)',
                shadowOffset:{width:0,height:2},
                shadowOpacity:0,
                shadowRadius:22,
                paddingBottom:0
            }}
            textStyle={{color:'#000000',fontFamily:fontKeys.MR,fontSize:18}}
            />

             <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
              <Text> Nombre de Personne(s)</Text>
              <Picker
                style={{flex:1}}
                selectedValue={selectedPeople}
                onValueChange={ (itemValue, itemIndex) =>
                  {setSelectedPeople(itemValue);
                  setPrixTotal(itemValue * prixUnitaire);

                  //setCashValue(val); 
                setMesombValue(itemValue * prixUnitaire - cashValue);
                } 
              }>
                <Picker.Item label="1" value="1" />
                <Picker.Item label="2" value="2" />
                <Picker.Item label="3" value="3" />
                <Picker.Item label="4" value="4" />
                <Picker.Item label="5" value="5" />
            </Picker>
          </View>

          <View style={{flex:1,borderColor:'#EAEAEA',borderTopWidth:1,borderStyle:'solid',borderBottomWidth:1,}}>
              <View>
              <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />

               </View>

                <View style={{flex:1,borderStyle:'solid',borderColor:'#EAEAEA',borderBottomWidth:1}}>
                   <View style={{flex:1,flexDirection:'row',justifyContent:'space-between',paddingTop:26,paddingBottom:21}}>
                      <TaxiText text={ textKeys.rider.select.estimate} styleText={{flex:1,fontFamily:fontKeys.MB,color:'#000000',fontSize:18}} />
                      <TaxiText text= { prixTotal + " F CFA"} styleText={{flex:1,color:'#000000',fontSize:18,fontFamily:fontKeys.MB}} />
                   </View>
                   <View style={{flex:1}}>
                        <TaxiText  text={textKeys.rider.select.hurry} style={{flex:1,marginBottom:20}} styleText={{flex:1,fontFamily:fontKeys.MR,color:'#878787',fontSize:14,flexWrap:'wrap'}} />
                        
                        <View style={{flex:1,flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginBottom:19}}>
                            <TaxiTextInput keyboardType='numeric' style={{flex:1, marginBottom:0,marginLeft:0,marginRight:0}} styleText={{flex:1,fontFamily:fontKeys.MR,color:'#878787',fontSize:14}} placeholder={'enter amount here'} func={bidding}
                              value={prixTotal +""}
                            />
                            <View style={{flex:1,justifyContent:'center'}}>
                              <Text style={{color:'#F2B84D',fontSize:14,fontFamily:fontKeys.MB}}> F. CFA </Text>
                            </View>

                            <TaxiText func={openingSplitPaymentModal} 
                              styleText={{color:'#5BE39B',fontSize:16,fontFamily:fontKeys.MB}}  
                              text="Frais Separes"
                              style={{borderColor:'red',borderRadius:8,borderStyle:'solid'}}
                            />
                            
                        </View>
                   </View>
                </View>
           
          </View>
          <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingTop:10,borderStyle:'solid',borderColor:'#EAEAEA',borderBottomWidth:1}}>
            <Text style={{flex:1,textAlign:'left',marginRight:20}}> Montant en Cash </Text>
            
            <TaxiTextInput 
              keyboardType='numeric' 
              style={{flex:1, marginBottom:0,marginLeft:'auto',marginRight:40}} 
              styleText={{flex:1,fontFamily:fontKeys.MEBI,color:'#878787',fontSize:14}} 
              placeholder={'enter amount here'} 
              func={settingCashValue}
              value={cashValue +""}
            />
          </View>

          <View style={{flex:1,justifyContent:'space-between',flexDirection:'row',alignItems:'center',paddingTop:10,borderStyle:'solid',borderColor:'#EAEAEA',borderBottomWidth:1,marginRight:40}}>
            <Text style={{flex:1,textAlign:'left',marginRight:20}}> Pay sur  Mobile Money </Text>
            <TaxiText  
              styleText={{color:'#5BE39B',fontSize:18,fontFamily:fontKeys.MB}}  
              text={mesombValue}
              style={{borderColor:'red',borderRadius:8,borderStyle:'solid'}}
            />
          </View>

          
          <View style={{marginBottom:19,paddingTop:18,flex:1,flexDirection:'row',justifyContent:'space-evenly'}}>
              <View style={{ 
                    borderColor:'red', //'#EAEAEA',
                    borderStyle:'solid',
                    borderWidth:2,
                    shadowColor: 'red',//'rgba(170,170,170,0.5)',
                    shadowOffset:{width:0,height:2},
                    shadowOpacity:0,
                    shadowRadius:22,
                    paddingBottom:0,
                    paddingTop:10,
                    paddingTop:12,
                    paddingHorizontal:10,
                    paddingBottom:15,
                    borderRadius:10,
                    alignItems:'center',
                    justifyContent:'center'
                }}>  
                  <TaxiText func={()=>alert("PAYER EN CASH")} 
                    styleText={{color:'red',fontSize:16,fontFamily:fontKeys.MB}}  
                    text="Payer Cash "
                    style={{borderColor:'red',borderRadius:8,borderStyle:'solid'}}
                  />
              </View>
              <View style={{ 
                    borderColor:'#5BE39B',
                    borderStyle:'solid',
                    borderWidth:2,
                    shadowColor: 'red',//'rgba(170,170,170,0.5)',
                    shadowOffset:{width:0,height:2},
                    shadowOpacity:0,
                    shadowRadius:22,
                    paddingBottom:0,
                    paddingTop:10,
                    paddingTop:12,
                    paddingHorizontal:10,
                    paddingBottom:15,
                    borderRadius:10,
                    alignItems:'center',
                    justifyContent:'center'
                }}>  
                <TaxiText func={async ()=> await mesombPayment(user)} 
                  styleText={{color:'#5BE39B',fontSize:16,fontFamily:fontKeys.MB}}  
                  text="Mobile Money"
                  style={{borderColor:'red',borderRadius:8,borderStyle:'solid'}}
                />
              </View>
          </View>
          <TaxiButton  text={textKeys.rider.select.request} style={{marginBottom:31}} func={requestRide}/>
          {
            openModal &&  (
            <View style={styles.centeredView}>
                <DisplayFareScreen 
                  gettingCopayer={gettingCopayer} 
                  rideDetails={rideDetails} 
                  closingModal={closingModal} 
                  closingSplitPaymentModal={closingSplitPaymentModal}  
                  gettingUpdatePrice={gettingUpdatePrice} 
                  updatePrice={updatePrice}
                  pu ={pu}
                  copayer={copayer}
                  gettingNewPriceVal ={gettingNewPriceVal}
                  inputsTrueFalse ={inputsTrueFalse}
                  inputs ={inputs}
            />
            </View>)
          }
        </ScrollView>
        </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
  //  alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
  // alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent:'space-evenly',
   
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
  },
  textInfo:{
    textAlign:'center',
    color:'#000000',
    fontFamily:fontKeys.MR,
    paddingLeft:25,
    paddingRight:25,
    paddingBottom:16,
    paddingTop:16,
    fontSize:18,
},
});

export default SelectTaxiTypeScreen;