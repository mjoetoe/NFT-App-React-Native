import { View, Text, TouchableOpacity,Image,StyleSheet } from 'react-native'
import React from 'react'

const ListItems = ({name,symbol,currentPrice,priceChangePercentage,LogoUrl}) => {
  return (
    <TouchableOpacity>
      <View style={styles.itemwrapper}>

        <View style={styles.leftWrapper}>
            <Image source={{uri : LogoUrl}} style={styles.ImageStyle}/>
            <View style={styles.titlesWrapper}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>{symbol.toUpperCase()}</Text>
            </View>
        </View>

        <View style={styles.rightWrapper}>
            <View style={styles.titlesWrapper}>
                <Text style={[styles.title,]}>{currentPrice}</Text>
                <Text style={[styles.rightsubtitle,{color:'red'}]}>{priceChangePercentage}</Text>
            </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    itemwrapper: {
        paddingHorizontal:16,
        marginTop:24,
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    },
    ImageStyle: {
        width: 48,
        height: 48,
        borderRadius: 48 / 2
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
export default ListItems