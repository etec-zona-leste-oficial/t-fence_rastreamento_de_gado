import React, { useState, useRef } from 'react';
import style from './Style';
import { View, TextInput } from 'react-native';

export default function InputVerification({ onChangeText }) {

    const [numeros, setNumeros] = useState(['', '', '', '', '']);
    const inputsRef = useRef([]); // refs para cada input

    const handleChange = (text, index) => {
        const novo = [...numeros];
        novo[index] = text;
        setNumeros(novo);

        // Envia o código parcial para o pai
        if (onChangeText) {
            onChangeText(novo.join(''));
        }

        // 👉 Se digitou algo e não está no último campo → foca no próximo
        if (text && index < novo.length - 1) {
            inputsRef.current[index + 1]?.focus();
        }

        // 👉 Se apagou (text === '') e NÃO está no primeiro → volta para o anterior
        if (text === '' && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    return (
        <View style={style.container}>
            {numeros.map((valor, index) => (
                <TextInput
                    key={index}
                    ref={(ref) => (inputsRef.current[index] = ref)}
                    style={style.input}
                    maxLength={1}
                    keyboardType="text"
                    value={valor}
                    onChangeText={(text) => handleChange(text, index)}
                />
            ))}
        </View>
    );
}
