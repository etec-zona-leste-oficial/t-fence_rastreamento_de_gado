import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({

   FullyScreen:{
    position: 'absolute',
    width: '112%',
    height:'106%',
    top: '0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
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
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: themes.colors.darkGray,
    width: '90%',
    padding: 14,
   },

   ComboInput:{
    width: '100%',
   },

   titleScreen:{
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
   },

   buttons:{
    marginTop: 10,
   },

   containerMap:{
      width: "100%",
      height: "30%",
      borderColor: themes.colors.green,
      borderWidth: 2,
      borderRadius: 3,
      marginBottom: 10,
    },

    map:{
      width: "100%",
      height: "100%",
      borderColor: themes.colors.green,
      borderRadius: 5,
    }


});

export default styles;