import React from 'react';
import {View,Text,SafeAreaView} from 'react-native';

import DestinationInputComp from '../../common/DestinationInputComp';
export default function SettingsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
            Settings!!!!!!
      </Text>

      <Text>
           Notifications
      </Text>

      <Text>
            Account  Information..... email change, phone number, Display name
      </Text>
      <Text>
            Invite a friend 
      </Text>

      <Text>
            Storage and Data (network usage and auto-download)
      </Text>
      <DestinationInputComp/>
    </SafeAreaView>
  );
}