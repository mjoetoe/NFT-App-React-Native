import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';

export default function DataLoader() {
  return (
    <View style={[StyleSheet.absoluteFillObject,{alignContent:'center',justifyContent:'center',zIndex:1}]}>
      <LottieView source={require('../assets/loader.json')} autoPlay loop/>          
    </View>
  )
}