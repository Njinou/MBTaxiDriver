import React from 'react';
import {Text,View,StyleSheet} from 'react-native';
import fontKeys from '../../keyText/fontKeys';

const TaxiText = (props) =>{
    const [value, onChangeText] = React.useState('');
    const setTexting = () => console.log("Text Component");

    return (
        <View style={props.style? props.style: styles.container}>
            <Text 
              onPress={props.func}
              style={props.styleText? [styles.text,props.styleText]: styles.text}>
                    {props.text ? props.text: ''}
            </Text>
        </View>
    )

}
export default TaxiText;

const styles = StyleSheet.create({
    container:{ 
        alignItems:'center',
        justifyContent:'center',
        textAlign:'center'
    },
    text:{
        color:'#F2B84D',
        fontSize:12,
        fontFamily:fontKeys.MSB
    }
});
