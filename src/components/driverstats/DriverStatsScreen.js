import React, { useState } from "react";
import {View,StyleSheet,Text} from 'react-native';

import HomeScreen from '../home/HomeScreen';

import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';

import textKeys from '../../keyText/textKeys';

import TaxiButton from '../common/TaxiButton'
import TaxiTextInput from '../common/TaxiTextInput'
import TaxiText from  '../common/TaxiText';

import TaxiImageText  from '../common/TaxiImageText';

import ScrollModalComponent from '../common/ScrollModalComponent';

const DriverStatsScreen = () => {
    const [period, setPeriod] = useState('Day');
     periodIsDay = () => setPeriod('Day');
     periodIsWeek = () => setPeriod('Week');
     periodIsMonth = () => setPeriod('Month');
     //periodClicked
  return (
      <View style={{height:'100%'}}>
          <View style={{borderColor:'#F2F2F2', borderStyle:'solid',backgroundColor:'white',borderWidth:1,justifyContent:'space-around',alignItems:'center',flexDirection:'row',paddingBottom:15,paddingTop:15}}>
            <TaxiText  styleText={[styles.period, period === 'Day'? styles.periodClicked : null]} text={textKeys.day}   func={periodIsDay}/>
            <TaxiText  styleText={[styles.period, period === 'Week'? styles.periodClicked : null]} text={textKeys.week}  func={periodIsWeek} />
            <TaxiText  styleText={[styles.period, period === 'Month'? styles.periodClicked : null]} text={textKeys.month} func={periodIsMonth}/>
          </View>

          <View style={{alignItems:'flex-start',backgroundColor:'white',paddingBottom:21,paddingTop:21,paddingLeft:17}}>
            <TaxiText styleText={[{color:'black',fontSize:14,fontFamily:fontKeys.MR}]}  text={'Date 1' + ' - ' +  'Date 2'}/>
          </View>

          <View style={{backgroundColor:'black',alignItems:'center',justifyContent:'space-between',flexDirection:'row',padding:16}}>
          <TaxiText styleText={[styles.period,{color:'white'}]} text={ textKeys.this + ' ' + textKeys.week}/>
            <TaxiText styleText={[styles.period,{color:'white',fontSize:20,fontFamily:fontKeys.MB}]}  text={'$' + '600'}/>
          </View>
        <View style={{backgroundColor:'white',paddingTop:20,marginTop:'auto'}}>
            <ScrollModalComponent horizontal={false} />
      </View>
    
    </View>
  );
};

const styles = StyleSheet.create({
button: {
    borderRadius: 20,
   // padding: 10,
    elevation: 2,
    backgroundColor:'#5BE39B'
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  period:{
    color:'#18BEAE',
    fontSize:14,
    fontFamily:fontKeys.MR
  },
  periodClicked:{
    paddingBottom:6,
    paddingTop:6,
    paddingRight:18,
    paddingLeft:18,
    fontWeight:'bold',
    backgroundColor:'#5BE39B',
    borderRadius: 20,
    elevation: 2,
  }
});


export default DriverStatsScreen;