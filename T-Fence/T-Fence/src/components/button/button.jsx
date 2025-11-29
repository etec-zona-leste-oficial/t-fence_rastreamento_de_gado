import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import style from './Style'

export default function button({onPress, texto, typeButton, disabled = false}) {
  return (

    <>
        <TouchableOpacity style={[typeButton !== "Shadow" ? style.button : style.buttonShadow, disabled && { opacity: 0.8 } ]} onPress={() => {onPress()}} disabled={disabled}>
            <Text style={typeButton !== "Shadow" ? style.textButton : style.textButtonShadow}>{texto}</Text>
        </TouchableOpacity>
    </>
  )
}

