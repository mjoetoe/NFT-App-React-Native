import { View, Text,Image,Linking } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-gesture-handler';

const ProfileItems = ({name,price,image,collectionName,collectionImage,valueFiat,Contract,Id}) => {
    if(collectionName === null){
        collectionName = ""
    }
    if (price > 0){
        price = (price/3000).toFixed(2)
    }
    if (collectionName === null){
        collectionName = " "
    }
    if(image === null){
        image="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    }
    if(image.slice(image.length - 3) === "mp4"){
        image="https://media.istockphoto.com/vectors/thumbnail-image-vector-graphic-vector-id1147544807?k=20&m=1147544807&s=612x612&w=0&h=pBhz1dkwsCMq37Udtp9sfxbjaMl27JUapoyYpQm0anc="
    }
    if(price === null){
        price = "n/a "
    }
  return (
    <View style={[tw`mr-6`,{display:"flex"}]}>
        <TouchableOpacity onPress={() => Linking.openURL("https://opensea.io/assets/"+Contract+"/"+Id  )}>
        <View>
            <Image style={{height:170,width:170,borderRadius:10}} source={{uri : image}} /> 
        </View>
        <View style={[tw`mt-1`,{backgroundColor:"#a9a9a9",borderRadius:10,height:55,width:170,marginBottom:20}]}>
            <View style={{flexDirection:"row",margin:6,justifyContent:"space-between"}}>
                <Text style={{color:"white"}}>{ ((name).length > 10) ? (((name).substring(0,13-3)) + '...') : name }</Text>
                <Text style={{textAlign:"right",color:"white"}}>{price+"ETH"}</Text>
            </View>
            <View style={{flexDirection:"row",marginLeft:4,marginRight:4,justifyContent:"space-between"}}>
                <View style={{flexDirection:"row",}}>
                    <Image style={{height:20,width:20,borderRadius:10 , marginRight:2}} source={{uri : collectionImage}}/>            
                    <Text style={{color:"#D3D3D3"}}>{ ((collectionName).length > 10) ? (((collectionName).substring(0,8-3)) + '...') : collectionName }</Text>
                </View>     
                <Text style={{textAlign:"right",color:"#D3D3D3"}}>{"$"+valueFiat.toFixed(2)}</Text>
            </View>
        </View>
        </TouchableOpacity>
    </View>
  )
}

export default ProfileItems