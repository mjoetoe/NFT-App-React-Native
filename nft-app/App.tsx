import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, TouchableOpacity,Modal,Text, View ,FlatList, ScrollView ,TextInput,Image,Linking, ScrollViewComponent} from 'react-native';
import tw from 'twrnc';
import React, { useState } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons,FontAwesome ,AntDesign,FontAwesome5,MaterialIcons} from '@expo/vector-icons';
import {createStackNavigator} from '@react-navigation/stack';

import Markets from './screens/Markets';
import Profile from './screens/Profile';
import Homescreen from './screens/Homescreen';
import TrackWallet from './screens/Homescreen/TrackWallet';
import CollectionDetail from './screens/Homescreen/CollectionDetail';
import MarketsToken from './screens/MarketsToken';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function OverView() {
  return(
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Homescreen" component={Homescreen} />
      <Stack.Screen name="TrackWallet" component={TrackWallet} />
      <Stack.Screen name="CollectionDetail" component={CollectionDetail} />      
    </Stack.Navigator>
  )
}
function Analytics(){
  return(
    <Stack.Navigator screenOptions={{ headerShown: false}}>
      <Stack.Screen name="Markets" component={Markets} />
      <Stack.Screen name="MarketsToken" component={MarketsToken} />
    </Stack.Navigator>
  )
}


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator 
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}>
        <Tab.Screen name="OverView" component={OverView} 
          options={{tabBarIcon: ({ color, size }) => (
          <Ionicons name="home" color={color} size={size} />
          ),}} />
        <Tab.Screen name="Analytics" component={Analytics} 
          options={{tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="chart-line" size={size} color={color} />),}} />
        <Tab.Screen name="Profile" component={Profile} 
          options={{tabBarIcon: ({ color, size }) => (
        <AntDesign name="user" size={size} color={color} />
        ),}} />
        
      </Tab.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  titlewrapper:{
    paddingHorizontal:16,
    flexDirection:"row",
  },
  hairlines:{
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#A9ABB1',
    marginHorizontal: 16,
    marginTop: 16,
  },
  ImageStyle:{
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    marginLeft: 16,
    marginTop: 16,
  }
});

