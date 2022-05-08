import {RefreshControl, View, Text ,StyleSheet,Image,FlatList} from 'react-native'
import React, { useEffect, useState } from 'react';
import tw from 'twrnc';
import DataLoader from '../components/DataLoader';

import { getProfileStats , getProfileTokens ,getProfileTokensDetail} from '../utils/apiData';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

const Markets = ({navigation}) => {
  const [data, setData] = useState();
  const [dataToken,setDataTokens] = useState();
  const [dataLoading,setDataLoading] = useState();
  
  const getData = async () => {
    setDataLoading(true);
    const data = await getProfileStats();    
    setData(data);
    setDataLoading(false);
  }
  const getDataTokens = async () => {
    setDataLoading(true);
    const data = await getProfileTokens();    
    setDataTokens(data);
    setDataLoading(false);
  }
  
  useEffect(() => {  
    getData();
    getDataTokens();
  },[])

  let value = ""
  let token = ""
  let logoUrl= "null"
  let percentage= ""
  let tokenPercentage = ""
  let nftWorthPercentage = ""
  let totalWorthPercentage = ""
 
  if (data === undefined){
  }
  else{
    //color for the token percentage
    if (data[0].changes.totalWorth.percentage > 0){
      tokenPercentage = "emerald"
    }
    else{
      tokenPercentage = "rose"
    }
    //color for nft worth ppercentage
    if (data[0].changes.nftWorth.percentage > 0){
      nftWorthPercentage = "emerald"
    }
    else{
      nftWorthPercentage = "rose"
    }
    //data for defiworth
    if(data[0].changes.defiWorth.value === 0){
      data[0].changes.defiWorth.value = "-"
      data[0].changes.defiWorth.percentage = ""
    }
    if(data[0].changes.totalWorth.percentage > 0){
      totalWorthPercentage = "emerald"
    }
    else{
      totalWorthPercentage = "rose"
    }

  }
  if (dataToken === undefined){
  }
  else{
    value = dataToken[0].value
    token = (dataToken[0].token).toUpperCase()
    logoUrl = dataToken[0].logoUrl
    percentage = dataToken[0].percentage
  }

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
      <View style={[styles.container]}>
        <View style={[tw`justify-center`,styles.titlewrapper]}>
          <Text style={[tw`text-xl font-bold mt-16`]}>Profile analystics</Text>
        </View>

        <View style={ styles.hairlines}/>
        {/* profile stats */}
        <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }>
        <View style={styles.box}>
          <Text style={tw`text-xs`}>Net worth</Text>
          <Text style={tw`text-5xl mt-2`}>${item.totalWorth.toFixed(2,0)}</Text>
          <Text style={tw`text-sm mt-2 text-${totalWorthPercentage}-500`}>{item.changes.totalWorth.percentage}% (${item.changes.totalWorth.value})</Text>
          <View style={{flexDirection:"row",marginTop:16}}>
            <View>
              <Text style={tw`text-xs flex-row`}>Tokens worth</Text>              
              <Text style={tw`text-sm mt-2`}>${item.tokensWorth.toFixed(2,0)}</Text>
              <Text style={tw`mt-2 text-${tokenPercentage}-500`}>{item.changes.tokensWorth.percentage}% (${item.changes.tokensWorth.value})</Text>
            </View>
            <View style={tw`ml-2`}>
              <Text style={tw`text-xs flex-row`}>Defi worth</Text>
              <Text style={tw`mt-2`}>{item.changes.defiWorth.value}</Text>
              <Text style={tw`mt-2 text-emerald-500`}>{item.changes.defiWorth.percentage}</Text>
            </View>
            <View style={tw`ml-6`}>
              <Text style={tw`text-xs flex-row`}>NFT worth</Text>
              <Text style={tw`mt-2`}>${item.nftWorth.toFixed(2,0)}</Text>
              <Text style={tw`mt-2 text-${nftWorthPercentage}-500`}>{item.changes.nftWorth.percentage}% (${item.changes.nftWorth.value})</Text>
            </View>          
          </View>           
        </View>
        {/* profile tokens */}
        <View style={[styles.box,{marginTop:12}]}>
              <View style={styles.boxSmall}>
                <Text style={tw`text-sm`}>Dominant token</Text>
                <View style={tw`flex-row justify-between items-center`}>
                  <View style={tw`flex-row items-center`}>
                    <Image  source={{uri: logoUrl}} style={{height:24,width:12, borderRadius:12}}/>   
                    <Text style={tw`text-xl `}>{token}</Text>  
                  </View>              
                  <Text style={tw`text-base `}>${value} ({percentage})</Text>                
                </View>
              </View>
              <View style={[styles.boxSmall,{marginTop:6}]}>
                <Text style={tw`text-sm`}>Tokens</Text>
                <View style={tw`flex-row justify-between items-center`}>
                  <Text style={tw`text-xl `}>3</Text>                                            
                </View>
              </View>
              <TouchableOpacity onPress={()=> navigation.navigate("MarketsToken")}>
              <View style={[tw` mt-4 p-2`,{backgroundColor:"rgb(5, 108, 255)" , borderRadius:5 }]}>
                <Text style={tw`text-2xl font-medium text-white text-center `}>OPEN TOKENS</Text>      
              </View>  
              </TouchableOpacity>                      
        </View>
        </ScrollView>                  
      </View>
    </>
  )
  const renderItem = ({ item }) => (
    <Item item={item}></Item>
  ); 
  
  return (
    <>    
   { dataLoading ? 
    <DataLoader/>:
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={item => item.nftWorth}
      horizontal={true}
      scrollEnabled={false}
    />    
    }      
    </>    
  )
}
const styles = StyleSheet.create({
    boxSmall:{
      backgroundColor:"#f6f6f6" ,
      borderRadius:5,
      height:80,
      padding:12,
    },
    box:{
      backgroundColor:"#ffffff",
      padding:20,
      paddingLeft:12,
      margin:20 , 
      borderRadius:10,
      shadowColor:"lightgray",
      shadowOffset:{width:0,height:0},
      shadowOpacity:4,
      shadowRadius:20,
    },
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
    },
    ImageStyle:{
      width: 64,
      height: 64,
      borderRadius: 64 / 2,
      marginLeft: 16,
      marginTop: 16,
    }
  });
export default Markets