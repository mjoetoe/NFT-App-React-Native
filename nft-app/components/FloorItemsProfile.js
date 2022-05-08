import { View, Text, TouchableOpacity,Image,StyleSheet ,Linking} from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'; 
import React from 'react'


const FloorItemsProfile = ({name,count,floorPrice,LogoUrl,backUpImage,backUpName,Slug}) => {
    if (floorPrice>0){
        floorPrice = (floorPrice/3000).toFixed(2)
    }
    else{floorPrice="0.00"}
    if(name === null){
        name = ""
    }
    if(LogoUrl === null){
        LogoUrl = backUpImage
    }
    if(name === ""){
        name = backUpName
    }
    return (
    <TouchableOpacity onPress={() => Linking.openURL("https://opensea.io/collection/"+Slug  )}>
      <View style={styles.itemwrapper}>

        <View style={styles.leftWrapper}>
            <Image source={{uri : LogoUrl}} style={styles.ImageStyle}/>
            <View style={styles.titlesWrapper}>
                <Text style={[styles.title,{textAlign:"left"}]}>{ ((name).length > 20) ? (((name).substring(0,20-3)) + '...') : name }</Text>
                <Text style={styles.subtitle}>{ ((count).length > 25) ? (((count).substring(0,25-3)) + '...') : count }</Text>                        
            </View>
        </View>

        <View style={styles.rightWrapper}>
            <View style={styles.titlesWrapper}>
                <Text style={[styles.title,]}>
                <FontAwesome5 name="ethereum" size={16} />
                {floorPrice}
                </Text>
            </View>
        </View>
      </View>  
      <View style={ styles.hairlines} />
    </TouchableOpacity>
    
  )
}
const styles = StyleSheet.create({
    expandableView:{
        flexDirection:"row",
    },
    expandableViewSubs:{
        marginTop:12,
        width:"25%",
        textAlign:"center",
    },

    itemwrapper: {
        paddingHorizontal:16,
        marginTop:24,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    ImageStyle: {
        width: 72,
        height: 72,
        borderRadius:5
    },
    hairlines:{
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#A9ABB1',
        marginHorizontal: 16,
        marginTop: 16,
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
    rightWrapper: {

    },
    rightsubtitle:{
        textAlign:'right',
    },
})
export default FloorItemsProfile