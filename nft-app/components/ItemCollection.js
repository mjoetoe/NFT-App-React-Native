import { View, Text, TouchableOpacity,Image,StyleSheet ,onPress,Modal} from 'react-native'
import React from 'react'
import tw from 'twrnc';


const ItemCollection = ({image,name,id,navigation,slug,adressVar}) => {
    return (
        <TouchableOpacity style={{flexDirection:'row'}} onPress={()=>navigation.navigate("CollectionDetail",{itemId: id, otherParam: name, picture: image, slugname : slug})}>
          <View> 
            <Image  source={{uri : image}} style={{width:120 , height:120, borderRadius:10 , marginRight:24}}/>          
            <Text style={tw`text-base`}>{ ((name).length > 10) ? (((name).substring(0,15-3)) + '...') : name }</Text>
          </View>
        </TouchableOpacity>
        
    )
};
  
export default ItemCollection;