import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
   button:{
        backgroundColor:themes.colors.green,
        width:'100%',
        height:50,
        borderRadius:5,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 15,
   },

   buttonShadow:{
     borderWidth: 2,
     borderColor: themes.colors.green,
     width:'100%',
     height:50,
     borderRadius:5,
     alignItems: 'center',
     justifyContent: 'center',
     marginTop: 15,
   },

   textButtonShadow:{
        fontWeight: 'Poppins',
        fontSize:14,
        fontFamily:'Poppins-Bold',
        color:themes.colors.green,
    },

   textButton:{
        fontWeight: 'Poppins',
        fontSize:14,
        fontFamily:'Poppins-Bold',
        color:themes.colors.white,
    },
});

export default styles;