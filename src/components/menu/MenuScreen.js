/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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


/*<Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>*/
const MenuScreen: () => React$Node = () => {
    const [user,setUser] = useState(null);
     useEffect(() => setUser(auth.currentUser), [])
//maplightgrey@2x.png
  return (
    <SafeAreaView style={{height:'100%',width:'80%',alignSelf:'stretch',backgroundColor:'#222222'}}>       
        <View style={{width:'100%',height:67,justifyContent:'center'}}>
            <View style={{flexDirection:'row'}}>
                {user? <Image source ={{uri:user.photoURL}} />: <Image  style={{marginLeft:15,marginRight:15}} source={imageKeys.profile} />}
            <TaxiText styleText={{color:'white',fontSize:15,fontWeight:'bold'}} text="John Smith"/>
            </View>
            <Text style={{paddingLeft:60,color:'white'}}>rating here...</Text>
        </View>
        
        <View style={{backgroundColor:'white',flex:1}}>
            <ImageBackground source={imageKeys.maplightgrey} style={styles.image}>
                <View style={{flexDirection:'row',justifyContent:'space-between',borderStyle:'solid',borderBottomWidth:1,borderBottomColor:'#DBDBDB',marginBottom:'auto'}}> 
                        <View style={{justifyContent:'space-around',paddingLeft:18}}>
                            <TaxiText styleText={{color:'#000000',fontWeight:'bold',fontSize:13}} text={textKeys.menu.earnings}/>
                            <TaxiText styleText={{color:'#000000',fontSize:18}} text={'$' + '400'}/>
                        </View>
                        <TaxiButton 
                            style={styles.cashButton} 
                            textStyle={styles.cashOut} 
                            text={textKeys.menu.cashOut}
                        />
                </View>
                <ScrollView style={{marginBottom:'auto',marginTop:22,flex:1}} contentContainerStyle={{justifyContent:'space-around'}}>
                    <TaxiImageText  image={imageKeys.scheduledridesgrey} text={textKeys.menu.schedule}/>
                    <TaxiImageText image={imageKeys.history} text={textKeys.menu.trip}/>
                    <TaxiImageText image={imageKeys.earning} text={textKeys.menu.earning}/>
                    <TaxiImageText image={imageKeys.payment} text={textKeys.menu.payment}/>
                    <TaxiImageText image={imageKeys.help} text={textKeys.menu.faq}/>
                    <TaxiImageText image={imageKeys.settings} text={textKeys.menu.settings}/>
                    <TaxiImageText image={imageKeys.contact} text={textKeys.menu.contact}/>
                </ScrollView>
                   
                    
            </ImageBackground>
        </View>
        
        <View style={{height:54,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
            <Image   source={imageKeys.logout} />
            <TaxiText styleText={{color:'white',fontFamily:fontKeys.MSB}} text={textKeys.menu.logout}/>
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

export default MenuScreen;
