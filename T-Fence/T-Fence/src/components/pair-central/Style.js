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

   pairCentral:{
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: 20,
      paddingRight: 20,
   },

   CreateButton:{
      backgroundColor: themes.colors.green,
      justifyContent: "center",
      alignItems: 'center',
      borderRadius: '50%',
      position: 'absolute',
      width: 50,
      height: 50,
      bottom: 23,
      right: 16
   },

   CreateScreen:{
    alignItems: 'left',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: themes.colors.darkGray,
    width: '90%',
    padding: 14,
   },

   ComboInput:{
    alignItems: 'center',
    width: '100%',
   },

   listDevices:{
      width: '100%',
      height: 200,
   },

   notFindDivices:{
      textAlign: 'center',
      marginTop: 15,
      color: themes.colors.darkGray,
   },

   titleScreen:{
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
   },

   subtitleScreen:{
      fontSize: 15,
      fontFamily: 'Poppins-Regular',
   },

   buttons:{
    marginTop: 10,
   }


});

export default styles;