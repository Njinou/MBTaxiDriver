import React from 'react';
import {SafeAreaView,StatusBar,ImageBackground,StyleSheet} from 'react-native';
import imageKeys from '../../keyText/imageKeys';
 
const ComponentBackgroundHOC = (props) =>{
    return (
    <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{alignItems:'center'}}>
            <ImageBackground source={imageKeys.background} style={styles.image}>
                {props.Composant}
            </ImageBackground>
        </SafeAreaView>
    </>
    );
}
export default ComponentBackgroundHOC

const styles = StyleSheet.create({
    image: {
        //flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        alignSelf:'stretch'
      },
});
