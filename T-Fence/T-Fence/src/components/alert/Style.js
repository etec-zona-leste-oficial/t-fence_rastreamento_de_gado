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

   AlertScreen:{
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: themes.colors.darkGray,
    width: '90%',
    padding: 21,
   },

   body:{
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      marginBottom: 20,
   },

   titleScreen:{
    fontSize: 20,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
   },

   subtitleScreen:{
      fontSize: 16,
      fontFamily: 'Poppins-Regular',
      textAlign: 'center',
   },

   buttons:{
      width: '100%',
      marginTop: 0,
   }


});

export default styles;