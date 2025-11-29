import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
     headerNavigation:{
          width: '100%',
          height: 50,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: 50,
     },

     button:{
          width: 30,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
   
     },

     buttonHeader:{
          position: 'absolute',
          left: 0,
     },

     arrowBack:{
          width: 24,
          height: 24,
          float: 'left',
     },

     titleHeader:{
          width: '80%',
          alignItems: 'center',
     },

     title:{
          fontFamily: 'Poppins-Medium',
          fontSize: 20,
     },

     
});

export default styles;