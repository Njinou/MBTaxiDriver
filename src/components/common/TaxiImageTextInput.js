import React from 'react';
import {StyleSheet,Image,View} from 'react-native';
import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';
import TaxiText from './TaxiText';
import TaxiTextInput from './TaxiTextInput';

const TaxiImageTextInput= (props) =>{
    return (
        <View style={props.style? [styles.container,props.style] : styles.container}> 
             <Image  style={props.imageStyle? [styles.image,props.imageStyle]  :styles.image} source={ props.image? props.image: imageKeys.profile} />
             <View style={{justifyContent:'center',alignItems:'center'}}>
                <TaxiTextInput style={props.inputStyle? [styles.input,props.inputStyle]  : styles.input} placeholder={props.placeholder? props.placeholder:"placeholder"} func={props.func} value={props.value} 
                    onSubmitEditing={props.onSubmitEditing}
                />
             </View>
        </View>     
    )
}
export default TaxiImageTextInput;

const styles = StyleSheet.create({
   container:{
       alignItems:'flex-start',
       flexDirection:'row',
       alignItems:'center',
     //  paddingBottom:25,
    },
    image:{
        marginLeft:15,
        marginRight:15
    },
    input:{
        position:'relative',
        color:'#3F4D5F',
        fontSize:15,
        paddingLeft:1,
        marginLeft:1,
        marginRight:1,
    }
});
