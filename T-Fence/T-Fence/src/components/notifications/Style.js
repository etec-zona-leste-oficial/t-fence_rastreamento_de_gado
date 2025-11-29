import { StyleSheet } from "react-native";
import { themes } from '../../global/themes'

const styles = StyleSheet.create({

   FullyScreen: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      top: '0',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
   },

   CreateButton: {
      backgroundColor: themes.colors.whiteGreen,
      justifyContent: "center",
      alignItems: 'center',
      borderRadius: '50%',
      position: 'absolute',
      width: 50,
      height: 50,
      top: 43,
      right: 16
   },

   pulse: {
      width: 120,
      height: 120,
      backgroundColor: 'rgba(255, 0, 0, 0.78)',
      borderRadius: "50%",
      position: "absolute",
      zIndex: 0,
   },

   notificationsScreen: {
      backgroundColor: '#FFFFFF',
      borderWidth: 1,
      borderRadius: 5,
      borderColor: themes.colors.darkGray,
      width: '95%',
      height: '70%',
      padding: 14,
   },

   headerNotifications: {
      flexDirection: "row",
      justifyContent: "space-between",
   },

   ComboInput: {
      width: '100%',
   },

   titleScreen: {
      fontSize: 20,
      fontFamily: 'Poppins-SemiBold',
   },

   buttons: {
      marginTop: 10,
   }


});

export default styles;