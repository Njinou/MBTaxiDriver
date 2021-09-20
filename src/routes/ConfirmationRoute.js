
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpConfirmationCode from '../components/signUp/SignUpConfirmationCode';
import ConfirmationSuccess from '../components/signUp/ConfirmationSuccess';

const Stack = createStackNavigator();
//{props => <HomeScreen {...props} extraData={someData} />}
function ConfirmationRoute() {
  return (
    <Stack.Navigator initialRouteName="code">
    <Stack.Screen name="code" component={SignUpConfirmationCode}  options={{ title: 'Confirmation Code' }}/>
    <Stack.Screen name="success" component={ConfirmationSuccess}  options={{ title: 'Confirmation Success' }}/>
  </Stack.Navigator>
  );
}

export default ConfirmationRoute;