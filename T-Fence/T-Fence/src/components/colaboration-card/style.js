import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
    card:{
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        paddingVertical: 10,
        marginVertical: 10
    },

    image:{

        paddingHorizontal: 10, // controla o tamanho da área azul
        justifyContent: 'center',
    },

    profilePic:{
        height: 35,
        width: 35,
        borderRadius: 100,
    },

    text:{
        flex: 1, // <<< faz o texto ocupar o espaço restante
        paddingHorizontal: 10,
        justifyContent: 'center',
    },

    title:{
        fontFamily: 'Poppins',
        fontSize: 14,
        lineHeight: 18,
    },

    subtitle:{
        fontFamily: 'Poppins',
        fontSize: 12,
        color: themes.colors.darkGray
    },

    options:{
        flexDirection: 'row',
        marginLeft: "auto",
        alignItems: 'center',
        gap: 20,
        paddingHorizontal: 10,
    },

    icon:{
        height: 18,
        width: 18
    },
});

export default styles;
