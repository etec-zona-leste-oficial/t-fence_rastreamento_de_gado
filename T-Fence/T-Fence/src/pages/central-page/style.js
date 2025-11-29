import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'top',
        padding: 30,
        paddingTop: 200,
    },

    boxTop:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    boxCenter:{
    gap:8
    },

    boxBottom:{
        alignItems: 'center',
        justifyContent: 'center',
    },

    forgotPassword:{
        textAlign:'right'
    },

    imgPadlock:{
        width:80,
        height:80,
        fontSize: 30,
        marginBottom: 20
    },

    text:{
        fontWeight: 'bold',
        fontSize: 30,
    },

    textDescription:{
        fontSize: 14,
        lineHeight: 24,
        textAlign:'center',
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
        fontSize:14,
        width:"90%",
        color:themes.colors.lightGreen,
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

    textLogout:{
        textAlign:'center'
    }
,
    textGreen:{
        color:themes.colors.green,
    }
  });

export default styles;
