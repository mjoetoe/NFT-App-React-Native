import { View, Text, TouchableOpacity,Image,StyleSheet,Linking } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import {Fontisto } from '@expo/vector-icons'; 



const CalendarItem = ({project,id,maxItems,Price,Discord,Website,TwitterId,saleDate}) => {
    let dateString
    let time
    if (saleDate  === undefined) {
        dateString = "N/A"
        time = "N/A"
    }
    else{
        let date = new Date(saleDate);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        time = "om "+hour + ":" + minutes + minutes + "U";
        dateString = day + "/" + month + "/" + year;
    }
    if(project === undefined){
        project = "N/A"
    }
    if(maxItems === undefined){
        maxItems = "N/A"
    }
    if(Price === undefined){
        Price = "N/A"
    }
    if(Discord === undefined){
        Discord = "N/A"
    }
    if(Website === undefined){
        Website = "N/A"
    }
    if(id === undefined){
        id = "N/A"
    }

    return (
      <View style={styles.itemwrapper}>
        <View style={styles.leftWrapper}>
            <Image source={{uri : `https://unavatar.io/twitter/${TwitterId}`}} style={styles.ImageStyle}/>
            <View style={styles.titlesWrapper}>
                <Text style={[styles.title,{textAlign:"left"}]}>{ ((project).length > 10) ? (((project).substring(0,12-3)) + '...') : project }</Text>
                <Text style={styles.subtitle}>{dateString}</Text>                                        
                <Text style={[styles.subtitle]}>{time}</Text>                           
            </View>
        </View>

        <View style={[styles.rightWrapper,{flexDirection:"column"}]}>
            <View style={[tw``,{flexDirection:"row"}]}>
                <View style={[tw`mt-2 ml-2`,[styles.boxes]]}>
                    <Text style={tw`text-center mt-1 font-bold`}>Supply</Text>
                    <Text style={[tw`text-center  `]}>{maxItems}</Text>
                </View> 
                <TouchableOpacity onPress={() => Linking.openURL(Website)}>
                    <View style={[tw`mt-2 ml-2`,[styles.boxes]]}>
                        <Fontisto name="world-o" size={28} style={{marginTop:6,marginLeft:20}} />                  
                    </View> 
                </TouchableOpacity>
            </View>
            <View style={[tw``,{flexDirection:"row"}]}>
                <View style={[tw`mt-1 ml-2`,[styles.boxes]]}>
                    <Text style={tw`text-center mt-1 font-bold`}>Price</Text>
                    <Text style={[tw`text-center `]}>{ ((Price).length > 5) ? (((Price).substring(0,9-3)) + '...') : Price }</Text>
                </View> 
                <TouchableOpacity onPress={() => Linking.openURL(Discord)}>
                    <View style={[tw`mt-1 ml-2 `,[styles.boxes]]}>
                        <Fontisto name="discord" size={32} style={{marginTop:6,marginLeft:20}} />
                    </View> 
                </TouchableOpacity>                
            </View>
        </View>
      </View> 
  )
}
const styles = StyleSheet.create({
    boxes:{
        height:40,
        width:70,
        backgroundColor:"#d3d3d3",
        borderRadius:5,
        fontSize:10
    },
    itemwrapper: {
        paddingHorizontal:16,
        marginTop:16,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    },
    ImageStyle: {
        width: 72,
        height: 72,
        borderRadius: 72/2
    },
    leftWrapper: {
        flexDirection:'row',
        alignItems:'center',
    },
    titlesWrapper:{
        marginLeft:8,
    },
    title:{
        fontSize:18,
        textAlign:"right"
    },
    subtitle:{
        marginTop:4,
        fontSize:14,
        color:'#A9ABB1'
    },
})
export default CalendarItem