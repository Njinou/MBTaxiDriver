import React,{forwardRef} from 'react';
import {Text,StyleSheet,TouchableOpacity,View,Pressable} from 'react-native';
import fontKeys from '../../keyText/fontKeys';

const TaxiButton= forwardRef((props, ref) => {
    const [text, setText] = React.useState('Button');
    const pressed = () => console.log("clicked");

    return (
        <Pressable 
            ref={ref}
            style={{alignSelf:'stretch',marginLeft:'14%', marginRight:'14%'}}
            onPress={props.func? props.func: pressed}
            disabled={props.disabled?props.disabled:false}
            >
            <View style={props.style? [styles.button,props.style]: styles.button,{backgroundColor:props.disabled? 'gray':"#F2B84D"}}>
                <Text style={props.textStyle?props.textStyle:styles.text}>  
                    {props.text? props.text: 'Button' } 
                </Text>
            </View>
        </Pressable>
    )

})
export default TaxiButton;

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        backgroundColor:"#F2B84D",
        height:48,
        borderRadius:3,
        justifyContent: "center",
        marginTop:15,
      },
    text:{
        textAlign:'center',
        padding:14,
        fontSize:18,
        fontFamily: fontKeys.MSB,
        color:'#3E3E39',
        textShadowColor: 'rgba(4,80,110,0.5)',
         textShadowOffset: {width: 1, height: 1},
         textShadowRadius: 1
    },
});
