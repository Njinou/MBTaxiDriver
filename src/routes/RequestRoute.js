
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeRiderDestinationScreen from '../components/rider/home/HomeRiderDestinationScreen';
import SetDestinationScreen from '../components/rider/destination/SetDestinationScreen';
import OptionRequestScreen from '../components/rider/rideOptions/OptionRequestScreen';
import  RideOtherOptions from '../components/rider/rideOptions/RideOtherOptions';

const Stack = createStackNavigator();
//{props => <HomeScreen {...props} extraData={someData} />}
//<Stack.Screen name="dest2" component={props => <SetDestinationScreen {...props} />}  />
function RequestRoute(props) {
  const [title,setTitle] = React.useState("Request Ride");
  getTitle = (val) => setTitle(val);
  return (
    <Stack.Navigator initialRouteName="dest1">
    <Stack.Screen name="dest1" component={HomeRiderDestinationScreen}  options={{ title: null }}/>

    <Stack.Screen name="dest2" options={{ title: title}}>
      {props => <SetDestinationScreen {...props}  testValue="Tester la valeur" getTitle={getTitle} extraData="FOU MOI LE CAMP DIDONC......."/>}
    </Stack.Screen>

    <Stack.Screen name="option" component={OptionRequestScreen}  options={{ title: 'Choose between the options' }}/>
    <Stack.Screen name="rideOption" component={RideOtherOptions}  options={{ title: 'Ride Option' }}/>
  </Stack.Navigator>
  );
}

export default RequestRoute;
