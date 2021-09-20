import React,{useState,useEffect,useRef} from 'react';
import HomeScreen from './HomeScreen';

const HomeOfflineScreen: () => React$Node = () => {
    return <HomeScreen color1= "#ED5A4D"  textColor1="white" color2="white" textColor2="#58585C" offline={true}/>
}
export default HomeOfflineScreen;