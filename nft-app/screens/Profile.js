import React, { useEffect,useState } from "react";
import tw from 'twrnc';
import { View, Text,StyleSheet, SafeAreaView,Image,FlatList,RefreshControl} from 'react-native'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { getProfileCollection } from '../utils/apiData';

import FloorItemsProfile from '../components/FloorItemsProfile';
import ProfileItems from '../components/ProfileItems';
import DataLoader from '../components/DataLoader';

const Floor = () => {
    const adress = "0x732ff1a8698f407C8c2e7dA6B8fb6005c71c3405"
    const [collectionData, setCollectionData] = useState();
    const [dataLoading,setDataLoading] = useState();

    const getCollectionData = async () => {
        setDataLoading(true);
        const data = await getProfileCollection(adress);
        setCollectionData(data);
        setDataLoading(false);
    }

    useEffect(() => {
        getCollectionData();
    },[])

    const Item = ({ item }) => (
        <FloorItemsProfile
            name={item.collection_name}
            floorPrice={item.prices.mainPrice.value}
            count={ item.count + " Items"}
            LogoUrl={item.collection_image}
            backUpImage={item.resourceUrl}
            backUpName={item.name}
            Slug={item.slug}
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
    
    return(    
        <>        
            {dataLoading ? <DataLoader/> :
            <SafeAreaView > 
                <FlatList
                data={collectionData}
                renderItem={renderItem}
                keyExtractor={item => item.token_id}                
                refreshControl={
                    <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    />
                }
                />
            </SafeAreaView>
        }            
        
        </>
    )
}

const Items = () => {
    const adress = "0x732ff1a8698f407C8c2e7dA6B8fb6005c71c3405"
    const [collectionData, setCollectionData] = useState();
    const getCollectionData = async () => {
        const data = await getProfileCollection(adress);
        setCollectionData(data);        
    }
    useEffect(() => {
        getCollectionData();
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
        <ProfileItems        
            name={item.name}
            price={item.prices.mainPrice.value}
            image={item.images.main}
            collectionName={item.collection_name}
            collectionImage={item.collection_image}
            valueFiat={item.prices.mainPrice.valueFiat}
            Contract={item.smart_contract_id}
            Id={item.token_id}
        />
    );
    const renderItem = ({ item }) => (
        <Item item={item}></Item>
    ); 
    return(
        <View style={[tw`pb-4 pt-4 ml-4`]}>
            <FlatList
                numColumns={2}
                data={collectionData}
                renderItem={renderItem}
                keyExtractor={item => item.token_id}      
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                    }          
            />            
        </View>
    )
}


const Tab = createMaterialTopTabNavigator();

export default function Profile() {
    const adress = "0x732ff1a8698f407C8c2e7dA6B8fb6005c71c3405"
    return (
        <>  
            <View style={styles.titlewrapper}>
                <Image style={styles.ImageStyle} source={{uri : "https://lh3.googleusercontent.com/eKqvn9Az5cj0QJHQDpjHrEwAocBDPo5qAPzzoGiImHo0uwOLYv4M60EzrNgDLDlcXSlrjHvTUKDkyjbgCiQ7fDVC_6LgGQWPosnknSw=s0"}} /> 
                <Text style={[tw`text-xl font-bold mt-2 `]}>Mjoetoe.eth</Text>
                <Text>{ ((adress).length > 10) ? (((adress).substring(0,15-3)) + '...') : adress }</Text>                
            </View>
            <Tab.Navigator style={[tw`mt-10`]} >
                <Tab.Screen name="Floor" component={Floor} />
                <Tab.Screen name="Items" component={Items} />
            </Tab.Navigator>                 
        </>
    )
}



const styles = StyleSheet.create({
    titlewrapper:{
        paddingHorizontal:16,
        alignItems: 'center',
        justifyContent:"center",
    },
    ImageStyle: {
        marginTop:100,
        width: 100,
        height: 100,
        borderRadius: 100 / 2
    },
    portFolioBox:{
        backgroundColor:"#D3D3D3",
        margin:10,
        paddingBottom:0,
        borderRadius:5,
        alignItems:'center',
        shadowColor:"black",
        shadowOffset:{width:0,height:0},
        shadowOpacity: 0.1,
        shadowRadius:10,
    }
  });