import React from 'react';
import {Text,View,StyleSheet,Button} from 'react-native';
import Voice from '@react-native-voice/voice';
const TaxiText = (props) =>{
    const [value, onChangeText] = React.useState('');
    const setTexting = () => console.log("Text Component");

    return (
        <View style={props.style? props.style: styles.container}>
            <Button title="Start Recording" onPress={()=> Voice.start('en-US')} color='red'/>
            <Button title="STOP Recording" onPress={()=> Voice.stop()} color='blue'/>
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
    }
});
