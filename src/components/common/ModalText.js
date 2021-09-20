import React from 'react';
import {Pressable, Text,View,StyleSheet} from 'react-native';
import fontKeys from '../../keyText/fontKeys';
const ModalText = (props) => {
    return (
        <Pressable
            onPress={props.func? props.func: console.log("Inside the component")}
        >
            <View style={[styles.modalView,props.style]}>
                {props.text1? <Text style={[styles.textStyle,{paddingBottom:11},props.text1Style]}>{props.text1}</Text>: null}
                {props.text2? <Text style={[styles.textStyle,{color:'#A3A1A1',fontSize:12},props.text2Style]}>{props.text2}</Text>: null}
                {props.Component}
            </View>
            {props.Component}
        </Pressable>
    );
}

const styles = StyleSheet.create({
   
    modalView: {
      margin:5,
      backgroundColor: "white",
      borderRadius: 20,
      width: 152,
      height:152,
      //padding: 15,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      padding:18,
     // justifyContent:'space-around'
    },
    textStyle: {
      color: "#000000",
      fontSize:16,
      fontFamily:fontKeys.MR,
      textAlign: "left"
    },
  });
  export default ModalText;
  