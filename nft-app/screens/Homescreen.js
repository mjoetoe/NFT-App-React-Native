
import tw from 'twrnc';
import React, { useEffect,useState } from "react";
import { SafeAreaView, StyleSheet, TouchableOpacity,Text, View ,FlatList ,Image,Linking} from 'react-native';


import { MaterialIcons} from '@expo/vector-icons';
import { getNftCalendar, getTrendingCollections } from '../utils/apiData';

import ItemCollection from '../components/ItemCollection';
import CalendarItem from '../components/CalendarItem';
import { ScrollView } from 'react-native-gesture-handler';

export default function Homescreen({navigation}) {    
      //NFT collection api call          
      const [collectionData, setCollectionData] = useState();
      const getCollectionData = async () => {
          const data = await getTrendingCollections();        
          setCollectionData(data);
      }
      useEffect(() => {
          getCollectionData();
      },[])

      //NFT Calendar api call
      const [calendarData, setCalendarData] = useState();
      const getCalendarData = async () => {
          const data = await getNftCalendar();
          const newdata = data.slice(0,2)    
          console.log(newdata)      
          setCalendarData(newdata);          
      }
      useEffect(() => {
         getCalendarData();
      },[])

      //Todays features
      const Item = ({ item }) => (
        <TouchableOpacity onPress={() => Linking.openURL("https://opensea.io/collection/"+ item.slug)}>
          <Image source={{uri : item.image}} style={styles.ImageStyle}/>
          <Text style={[tw`text-center ml-2 mt-2`]}>
            { ((item.name).length > 10) ? (((item.name).substring(0,10-3)) + '...') : item.name }
          </Text>
        </TouchableOpacity>
      );
      const renderItem = ({ item }) => (
        <Item item={item}></Item>
      ); 
      
      //NFT Collections
      const Item2 = ({ item }) => (
        <ItemCollection
              name={item.name}
              image={item.image}
              id={item.id}
              navigation={navigation}
              slug={item.slug}
        />
      );
      const renderItem2 = ({ item }) => (
        <Item2 item={item}></Item2>
      ); 
      //NFT Calendar
      const Item3 = ({ item }) => (
        <CalendarItem
          id={item.id}
          project={item.Project}
          maxItems={item["Max Items"]}
          Price={item.Price}
          Discord={item.Discord}
          saleDate={item["Sale Date"]}   
          TwitterId={item.TwitterId}
          Website={item.Website}
        />
      );
      const renderItem3 = ({ item }) => (
        <Item3 item={item}></Item3>
      );

      return (        
        <View style={styles.container}>
          {/* todays features */}
          <View style={styles.titlewrapper}>
           <Text style={[tw`text-xl font-bold mt-16`]}>Todays Features</Text>
          </View>
          <View style={ styles.hairlines} />
          <SafeAreaView >
            <FlatList
              data={collectionData}
              renderItem={renderItem}
              keyExtractor={item => item.id}
              horizontal={true}
            />
          </SafeAreaView>
    
          {/* NFT Calendar wallets */}
          <View style={[styles.titlewrapper]}>
            <TouchableOpacity style={{flexDirection:"row"}} onPress={()=> navigation.navigate("TrackWallet")}>
              <Text style={[tw`text-xl font-bold mt-4`]}>NFT Calendar</Text>
              <MaterialIcons name="arrow-forward-ios" size={16} style={{marginTop:23 , marginLeft:2}} />
            </TouchableOpacity>
          </View>
          <View style={ styles.hairlines}/>
            <FlatList
              data={calendarData}
              renderItem={renderItem3}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
    
          {/* NFT collections*/}
          <View style={[styles.titlewrapper]}>            
              <Text style={[tw`text-xl font-bold mt-4`]}>NFT Collections</Text>            
          </View>
          <View style={ styles.hairlines}/>
          <View style={tw`pb-8 pt-4 ml-4`} horizontal>
            <FlatList
                data={collectionData}
                renderItem={renderItem2}
                keyExtractor={item => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
          </View>
        </View>        
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