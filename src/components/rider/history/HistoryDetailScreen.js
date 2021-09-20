import React,{useState} from 'react';
import {View,Text,SafeAreaView} from 'react-native';

export default function HistoryDetailScreen(props) {
    const [item,updateItem] = useState (props.route.params.item)//(props.route.params.item);
    console.log('item item',item);
    
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>
            History DEtail screen
      </Text>
    </SafeAreaView>
  );
}