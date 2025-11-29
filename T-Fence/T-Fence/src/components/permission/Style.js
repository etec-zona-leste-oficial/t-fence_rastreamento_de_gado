import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({

   FullyScreen:{
    position: 'absolute',
    width: '100%',
    height:'107%',
    top: '0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
   },

   CreateScreen:{
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    width: '90%',
    padding: 0,
   },

   header:{
      width: '100%',
      paddingLeft: 14,
      paddingRight: 14,
      paddingTop: 14,
      paddingBottom: 8,
      alignItems: 'center',
   },

   body:{
      marginTop: 15,
      alignItems: 'center',
      width: '100%',
      padding: 14,
   },

   titleScreen:{
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
   },

   subtitleScreen:{
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
      textAlign: 'center',
      paddingLeft: 20,
      paddingRight: 20,
      marginTop: 10,
      lineHeight: 23,
   },

   horizontalLine:{
    width: '100%',
    height: 1,
    backgroundColor: themes.colors.lightGray,
   },

   buttons:{
      marginBottom: 14,
      width: '100%',
      marginTop: 20,
      justifyContent: 'center',
      alignItems: 'center',
   },

   textButton:{
      fontFamily: 'Poppins-Medium',
      fontSize: 16,
      textDecorationLine: 'underline',
      marginTop: 5,
   },


});

export default styles;