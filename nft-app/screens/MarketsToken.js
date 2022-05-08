import { View, Text,StyleSheet,TouchableOpacity ,Image,FlatList,RefreshControl} from 'react-native'
import React, { useEffect, useState } from 'react';

import tw from 'twrnc';
import DataLoader from '../components/DataLoader';

import { AntDesign} from '@expo/vector-icons';
import { getProfileTokensDetail } from '../utils/apiData';

export default function MarketsToken({navigation}) {

  const [dataTokenDetail,setDataTokensDetail] = useState();
  const [dataLoading,setDataLoading] = useState();

  const getDataTokensDetail = async () => {
    setDataLoading(true);
    const data = await getProfileTokensDetail();      
    setDataTokensDetail(data);
    setDataLoading(false);
  }
  useEffect(() => {
    getDataTokensDetail();
  },[])
  
  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    }, []);

  const Item = ({ item }) => (
    <>
        <View style={[tw`flex-row mt-2 ml-2 mr-2 p-2`,{backgroundColor:"#f6f6f6" , borderRadius:5 }]}>
          <View style={{justifyContent:"center"}}>
            <Image  source={{uri: item.images.large }} style={{height:24,width:24, borderRadius:12}}/> 
          </View>
          <View style={tw`ml-2 flex-1`}>
            <View style={tw`flex-row justify-between`}>
              <Text style={tw`text-base`}>{item.title}</Text>
              <Text style={tw`mt-2`}>${item.nominalValueFiat.displayValueFiat > 0?item.nominalValueFiat.displayValueFiat:"0"}</Text>
            </View>
            <View style={tw`flex-row justify-between`}>
              <Text>{item.display_amount} {item.token} </Text>
              
            </View>
          </View>      
        </View> 
    </>
  )

  const renderItem = ({ item }) => (
    <Item item={item}></Item>
  ); 
  return (
    <View style={[styles.container]}>
        <View style={[tw`mb-4`,styles.titlewrapper]}>
            <TouchableOpacity onPress={()=>navigation.navigate("Markets")}>
                <AntDesign name="left" size={24} style={tw`mt-16`} />
            </TouchableOpacity>                     
            <Text style={[tw`text-xl font-bold mt-16 ml-30`]}>Tokens</Text>
        </View>
        {dataLoading?<DataLoader></DataLoader>:
          <FlatList
          data={dataTokenDetail}
          renderItem={renderItem}
          keyExtractor={item => item.balance}   
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }                   
        /> 
        }
                        
    </View>
    
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      width: 390,
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
    }
  });