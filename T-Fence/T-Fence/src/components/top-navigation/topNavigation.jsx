import React from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import ArrowBack from '../../assets/icons/arrow_back.png'
import style from './Style'

export default function topNavigation({onPress, text}) {
  return (
        <View style={style.headerNavigation}>

          <View style={style.buttonHeader} >
          
            <TouchableOpacity style={style.button} onPress={onPress}>
              <Image
                source={ArrowBack}
                resizeMode="contain"
                style={style.arrowBack}
             />
            </TouchableOpacity>
          </View>

          <View style={style.titleHeader} >
               <Text style={style.title}>{text}</Text>
          </View>
          
          
        </View>
  )
}

