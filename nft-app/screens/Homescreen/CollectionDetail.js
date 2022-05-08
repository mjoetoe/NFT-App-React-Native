import tw from 'twrnc';

import { View, Text,Image,StyleSheet, FlatList,TouchableOpacity,Linking} from 'react-native'
import React, { useEffect, useState } from 'react';

import {getSlugDetailCollection} from '../../utils/apiData';
import { AntDesign,FontAwesome5} from '@expo/vector-icons';

export default function CollectionDetail({route,navigation}) {
    const { otherParam , picture,slugname} = route.params;    
    const [collectionData, setCollectionData] = useState();
    
    const getCollectionData = async (slug) => {
        const data = await getSlugDetailCollection(slug);
        setCollectionData(data);
    }
    useEffect(() => {
        getCollectionData(slugname);
    },[])

    
    const Item = ({ item }) => (
        <>
            <View style={{flexDirection:"column"}}>
                <View style={{flexDirection:"row"}}>
                    <View style={[tw`ml-6 mr-2`,[styles.boxes]]}>
                        <Text style={tw`text-center mt-1 font-bold`}>24h volume</Text>
                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                            <Text style={tw`text-center mt-1 `}>{parseFloat(item.one_day_volume).toFixed(2)}</Text>
                            <FontAwesome5 name="ethereum" size={12} style={{marginTop:3}} />
                        </View>             
                    </View>
                    <View style={[tw`mr-2`,[styles.boxes]]}>
                        <Text style={tw`text-center mt-1 font-bold`}>Floor price</Text>
                        <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                            <Text style={tw`text-center mt-1 `}>{item.floor_price}</Text>
                            <FontAwesome5 name="ethereum" size={12} style={{marginTop:3}} />
                        </View>
                    </View>
                    <View style={[tw`mr-2`,[styles.boxes]]}>
                        <Text style={tw`text-center mt-1 font-bold`}>Supply</Text>
                        <Text style={tw`text-center mt-1 `}>{item.supply}</Text>
                    </View>
                </View>
                <View style={{flexDirection:'row'}}>
                    <View style={[tw`mt-2 ml-20`,[styles.boxes]]}>
                            <Text style={tw`text-center mt-1 font-bold`}>Website</Text>
                            <Text style={[tw`text-center mt-1 `,{color: 'blue'}]} onPress={() => Linking.openURL(item.website_url)}>{ ((item.address).length > 10) ? (((item.name).substring(0,10-3)) + '...') : item.name }</Text>
                    </View>
                    <View style={[tw`mt-2 ml-2`,[styles.boxes]]}>
                            <Text style={tw`text-center mt-1 font-bold`}>Address</Text>
                            <Text style={[tw`text-center mt-1 `,{color: 'blue'}]} onPress={() => Linking.openURL('https://etherscan.io/address/'+item.address)}>{ ((item.address).length > 10) ? (((item.address).substring(0,10-3)) + '...') : item.address }</Text>
                    </View> 
                </View> 
                <View>
                    {item.is_revealed == "0" ? <View style={[tw`mt-2 ml-34`,[styles.boxes,{backgroundColor:"#00FF00"}]]}>
                            <Text style={tw`text-center mt-1 font-bold`}>Revealed</Text>
                            <Text style={[tw`text-center mt-1 `]}>Yes</Text>
                    </View> :<View style={[tw`mt-2 ml-34`,[styles.boxes,{backgroundColor:"#EE4B2B"}]]}>
                            <Text style={tw`text-center mt-1 font-bold`}>Revealed</Text>
                            <Text style={[tw`text-center mt-1 `]}>Not yet</Text>
                    </View> }
                    
                </View>                                      
            </View>    
        </>
      );
      const renderItem = ({ item }) => (
        <Item item={item}></Item>
      ); 

    return (
        <View> 
            <View style={{flexDirection:"row"}}>
                <TouchableOpacity onPress={()=>navigation.navigate("Homescreen")}>
                    <AntDesign name="left" size={24} style={tw`mt-16 ml-2`} />
                </TouchableOpacity>             
            </View>
            <Text style={[tw`text-xl font-bold  text-center`]}>{otherParam}</Text>
            <View style={styles.test}>
            <Image  source={{uri : picture}} style={[{width:250 , height:250, borderRadius:10 , marginTop:24,marginLeft:68}]}/>   
            </View>
             
            <View style={[tw`flex-row mt-12`,{flexDirection:"row"}]}>
                <FlatList
                    data={collectionData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    horizontal={true}
                    scrollEnabled={false}
                />                
            </View>     
        </View>
    )
}

const styles = StyleSheet.create({
    test:{
        shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity: 0.5,
        shadowRadius:20,
    },
    boxes:{
        marginTop:20,
        height:50,
        width:110,
        backgroundColor:"#fff",
        borderRadius:10,
        shadowColor:"lightgray",
        shadowOffset:{width:0,height:0},
        shadowOpacity:4,
        shadowRadius:10,
    }
  });