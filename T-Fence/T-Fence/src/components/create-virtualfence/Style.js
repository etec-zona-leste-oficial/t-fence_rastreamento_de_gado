import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({

   FullyScreen:{
    position: 'absolute',
    width: '112%',
    height:'109%',
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
   },

   topNavigation:{
      backgroundColor: "red",
      position: "absolute",
      paddingLeft: 15,
      top: 0,
      left: 0,
      marginLeft: 3,
      width: "100%",
      justifyContent: "center",
      alignItems: "center"
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
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: themes.colors.darkGray,
    width: '100%',
    height: '100%',
   //  padding: 14,
    paddingTop: 100,
   },

   ComboInput:{
    alignItems: 'center',
    width: '100%',
   },

   titleScreen:{
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
   },

   buttons:{
    marginTop: 10,
   },

   headerCreateFence:{
      backgroundColor: themes.colors.green,
      width: '100%',
      height: 50,
   },

   mapCreateFence:{
      backgroundColor: themes.colors.lightGray,
      width: "100%",
      height: "100%",
      borderColor: themes.colors.green,
   },

   map:{
      width: "100%",
      height: "100%",
      borderColor: themes.colors.green,
   },

   headerButtons:{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      borderRadius: 15,
   },

   viewButtons:{
      width: "100%"
   },

   comboButtons:{
      width: "100%",
      marginBottom: 4

   },

   buttonRedo:{
      width: 34,
      height: 34,
      justifyContent: "center",
      alignItems: "center",
   },

   textTitleButtons:{
      fontFamily: "Poppins-Medium",
      fontSize: 20,
   },

   crosshair:{
   position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -14, // metade do tamanho do ícone
    marginTop: -14,
   },


});

export default styles;