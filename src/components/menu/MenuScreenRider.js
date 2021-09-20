/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
//await firebase.auth().currentUser.updateProfile(update);
 import React,{useState,useEffect} from 'react';
 import {StyleSheet,View,Image,Text,ImageBackground,ScrollView,SafeAreaView} from 'react-native';
 
 import fontKeys from '../../keyText/fontKeys';
 import imageKeys from '../../keyText/imageKeys';
 
 import textKeys from '../../keyText/textKeys';
 
 import TaxiButton from '../common/TaxiButton'
 import TaxiTextInput from '../common/TaxiTextInput'
 import TaxiText from  '../common/TaxiText';
 
 import TaxiImageText  from '../common/TaxiImageText';
 
 import auth from '@react-native-firebase/auth';

 import { createDrawerNavigator } from '@react-navigation/drawer';
 
 
 const Drawer = createDrawerNavigator();

 signingOut = ()=> {auth()
                    .signOut()
                    .then(() => console.log('User signed out!'));
                }



 const MenuScreenRider: (props) => React$Node = (props) => {

    const [user,setUser] = useState (auth().currentUser);

   /* const [user,setUser] = useState(null);
     useEffect(() => setUser(auth.currentUser), [])*/
    // {user? <Image source ={{uri:user.photoURL}} />: <Image  style={{marginLeft:15,marginRight:15}} source={imageKeys.profile} />} //{ navigation },
    navigateRoute = (route) =>{
        props.navigation.navigate(route);
    }
    // home history saved payment scheduled help settings contact
 //maplightgrey@2x.png
   return (
     <SafeAreaView style={{height:'100%',width:'80%',alignSelf:'stretch',backgroundColor:'#222222'}}>       
         <View style={{width:'100%',height:67,justifyContent:'center'}}>
             <View style={{flexDirection:'row'}}>
                {user? <Image  style={{marginLeft:15,width:35,height:35,marginRight:15,borderRadius:20}} source={{uri:user.photoURL}} />: <Image  style={{marginLeft:15,marginRight:15}} source={imageKeys.profile} /> }
             <TaxiText styleText={{color:'white',fontSize:15,fontWeight:'bold'}} text={user? user.displayName:'update your Name'}/>
             </View>
             <Text style={{paddingLeft:60,color:'white'}}>rating here...</Text>
         </View>
         
         <View style={{backgroundColor:'white',flex:1}}>
             <ImageBackground source={imageKeys.maplightgrey} style={styles.image}>
                
                 <ScrollView style={{marginBottom:'auto',marginTop:22,flex:1}} contentContainerStyle={{justifyContent:'space-around'}}>
                   
                    
                 <TaxiImageText  image={imageKeys.taxiicon} text={'Home'} func={()=>navigateRoute('destination')}/>
                 
                     <TaxiImageText  image={imageKeys.scheduledridesgrey} text={textKeys.menu.schedule} func={()=>navigateRoute('scheduled')}/>
                     <TaxiImageText image={imageKeys.history} text={textKeys.menu.tripHistory} func={()=>navigateRoute('history')}/>
                     <TaxiImageText image={imageKeys.payment} text={textKeys.menu.payment} func={()=>navigateRoute('payment')}/>
                     <TaxiImageText image={imageKeys.help} text={textKeys.menu.faq} func={()=>navigateRoute('help')}/>
                     <TaxiImageText image={imageKeys.settings} text={textKeys.menu.settings} func={()=>navigateRoute('settings')}/>
                     <TaxiImageText image={imageKeys.contact} text={textKeys.menu.contact} func={()=>navigateRoute('contact')}/>
                     <TaxiImageText image={imageKeys.Stargrey} text={textKeys.menu.saved} func={()=>navigateRoute('saved')}/>
                 </ScrollView>
             </ImageBackground>
         </View>
         
         <View style={{height:54,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
             <Image   source={imageKeys.logout} />
             <TaxiText styleText={{color:'white',fontFamily:fontKeys.MSB}} text={textKeys.menu.logout} func={signingOut}/>
         </View>   
     </SafeAreaView>
   );
 };
 
 const styles = StyleSheet.create({
     cashButton:{
         backgroundColor:'#18BEAE',
         borderRadius:4.09, 
         shadowColor: '#18BEAE',
         shadowOffset: { width: 0, height: 0 },
         shadowOpacity: 0,
         shadowRadius: 2,  
         elevation: 5,
         marginTop:23,
         marginBottom:24
     },
     cashOut:{
         color:'white',fontSize:22,
         fontFamily:fontKeys.MSB,
         textShadowColor: 'rgba(4,80,110,0.5)', 
         textShadowOffset: {width: 1, height: 1},
         textShadowRadius: 1,
         paddingLeft:6,
         paddingRight:6
     },
     image: {
         flex: 1,
         resizeMode: "cover",
         justifyContent: "center",
         alignSelf:'stretch'
       },
 
 });
 
 export default MenuScreenRider;
 