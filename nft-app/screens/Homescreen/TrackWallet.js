import {RefreshControl, View, Text,FlatList } from 'react-native'
import React, { useEffect,useState } from "react";
import { ScrollView ,TouchableOpacity} from 'react-native-gesture-handler';

import tw from 'twrnc';
import DataLoader from '../../components/DataLoader';
import CalendarItem from '../../components/CalendarItem';

import { AntDesign} from '@expo/vector-icons';
import { getNftCalendar } from '../../utils/apiData';

export default function TrackWallet({navigation}) {
    const [collectionData, setCollectionData] = useState();
    const [dataLoading,setDataLoading] = useState();

    const getCollectionData = async () => {
        setDataLoading(true);
        const data = await getNftCalendar();    
        setCollectionData(data);
        setDataLoading(false);
    }

    useEffect(() => {
        getCollectionData();
    },[])

    const Item = ({ item }) => (
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

    const renderItem = ({ item }) => (
    <Item item={item}></Item>
    ); 

    const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
    }
    
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(1000).then(() => setRefreshing(false));
    }, []);

  return (
      <>
        {dataLoading?<DataLoader/>:
        <View>
            <View style={{flexDirection:"row",}}>
                <TouchableOpacity onPress={()=>navigation.navigate("Homescreen")}>
                    <AntDesign name="left" size={24} style={tw`mt-16 ml-2`} />
                </TouchableOpacity>            
                <Text style={[tw`text-xl font-bold mt-16 ml-26`,{alignItems:'center',justifyContent:'center'}]}>NFT Calendar</Text>
            </View>    
            <FlatList
                data={collectionData}
                renderItem={renderItem}
                keyExtractor={item => item.Project}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }
            />
        </View>
        }        
    </>
  )
}