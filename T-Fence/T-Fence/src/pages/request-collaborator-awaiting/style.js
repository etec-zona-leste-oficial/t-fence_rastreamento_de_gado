import { StyleSheet } from "react-native";
import {themes} from '../../global/themes';

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 30,
    },

    boxTop:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxCenter:{
    alignItems: 'center',
    justifyContent: 'center',
    gap:20,
    marginBottom: 30,
    },

    boxBottom:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    title:{
        fontWeight: 'bold',
        fontSize: 30,
        marginBottom: 15,
    },

    subtitle:{
        textAlign:"center",
    },

    textEmail:{
        fontWeight: 'bold',
        color: themes.colors.green
    },

    imgVerification:{
        width:80,
        height:80,
        fontSize: 30,
        marginBottom: 35
    },

    text:{
        width: "100%",
        flexDirection: "colunm",
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 30
    },

    verificarButton:{
        backgroundColor:themes.colors.green,
        width:'100%',
        height:45,
        borderRadius:5,
        color:themes.colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },

    textButton:{
        fontSize:14,
        fontWeight:'bold',
        color:themes.colors.white,
    },

});

export default styles;