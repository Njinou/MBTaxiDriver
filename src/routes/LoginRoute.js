
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignUp from '../components/signUp/SignUp';
import SignUpConfirmationCode from '../components/signUp/SignUpConfirmationCode';
import ConfirmationSuccess from '../components/signUp/ConfirmationSuccess';

import LoginScreen from '../components/login/LoginScreen';

const Stack = createStackNavigator();
//{props => <HomeScreen {...props} extraData={someData} />}
function LoginRoute() {
  return (
    <Stack.Navigator initialRouteName="login">
    <Stack.Screen name="login" component={LoginScreen}  options={{ title: 'Login' }}/>
    <Stack.Screen name="signup" component={SignUp}  options={{ title: 'SignUp' }}/>
    <Stack.Screen name="confirmationCode" component={SignUpConfirmationCode}  options={{ title: 'Confirmation Code' }}/>
    <Stack.Screen name="success" component={ConfirmationSuccess}  options={{ title: 'Confirmation Success' }}/>
  </Stack.Navigator>
  );
}

export default LoginRoute;
