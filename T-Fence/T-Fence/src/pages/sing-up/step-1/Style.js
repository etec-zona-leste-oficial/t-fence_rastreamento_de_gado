import { StyleSheet } from "react-native";
import {themes} from '../../../global/themes'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'top',
        padding: 30,
        paddingTop: "50%",

    },

    boxTop:{
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        gap: 20,
    },

    boxCenter:{
        justifyContent: 'top',
        paddingTop: 20,
        width: '100%',
    },

    textBox:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    title:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30,
    },

    text:{
        fontFamily: 'Poppins',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
    },

    boxBottom:{
        alignItems: 'center',
        height: '30%',
        width: '100%',
    },

    imageTop:{
        width: 80,
        height: 80,

    },

    inputBox: {
        width: '100%',
        height: 45,
        borderWidth: 2,
        borderRadius:5,
        flexDirection:'row',
        alignItems: 'center',
        borderColor:themes.colors.green,
        paddingLeft:12,
        marginTop:11,
    },

    input:{
        fontSize: 14,
        width:"90%"
    },

    loginButton:{
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
