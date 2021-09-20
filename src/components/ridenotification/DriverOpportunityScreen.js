import React, { useState } from "react";

import HomeScreen from '../home/HomeScreen';

import ScrollModalComponent from '../common/ScrollModalComponent';

const DriverOpportunityScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
  return (
    <HomeScreen color1= "#ED5A4D"  textColor1="white" color2="white" textColor2="#58585C" offline={true} Component={<ScrollModalComponent horizontal={true} />}/>
  );
};


export default DriverOpportunityScreen;