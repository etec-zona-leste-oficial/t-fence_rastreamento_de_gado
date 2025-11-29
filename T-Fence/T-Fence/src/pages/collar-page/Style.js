import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'Left',
        justifyContent: 'top',
    },

    content:{
        alignItems: 'Left',
        justifyContent: 'top',
        padding: 20,
    },

    title:{
        marginTop: 20,
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
    },

    listCollar:{
        width: '100%',
        gap: 8,        
    },

    SearchBar:{
        marginTop: 20
    },

    collar:{
      marginTop: 10,
      height:"100%"
    },

    titleCollar:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
    },

    listCollar:{
      marginTop: 0,
      gap: 8,
    },
  });

export default styles