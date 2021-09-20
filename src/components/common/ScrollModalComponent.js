import React, { useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View,ScrollView, } from "react-native";

import fontKeys from '../../keyText/fontKeys';
import imageKeys from '../../keyText/imageKeys';

import textKeys from '../../keyText/textKeys';

import TaxiButton from '../common/TaxiButton'
import TaxiTextInput from '../common/TaxiTextInput'
import TaxiText from  '../common/TaxiText';

import TaxiImageText  from '../common/TaxiImageText';
import HomeScreen from '../home/HomeScreen';
import ModalComponent from '../common/ModalComponent';

const ScrollModalComponent = (props) =>{
    const [horizontal,setHorizontal] = useState(props.horizontal);
    return (
        <ScrollView   horizontal={horizontal}>
            <ModalComponent horizontal={horizontal}/>
            <ModalComponent horizontal={horizontal}/>
            <ModalComponent horizontal={horizontal}/>
        </ScrollView>
    );
}

export default ScrollModalComponent;