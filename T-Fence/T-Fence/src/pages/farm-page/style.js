import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        padding: 16,
        paddingTop: 50
    },

    headerFarm:{
      width: "100%",
      height: "20%",
      alignItems: "center",
      flexDirection: "row",
      gap: 20,
    },

    FarmImage:{
      width: "84",
      height: "84",
    },

    mailImage:{
      width: "16",
      height: "16",
    },

    farmInformations:{
      justifyContent: "center",
      alignContent: 'center',
    },

    farmSubtitle:{
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },

    farmName:{
      width: "90%",
      fontSize: 20,
      fontFamily: 'Poppins-Medium',
    },

    ownerName:{
      fontFamily: 'Poppins',
      width: "80%"
    },

    verticalSeparator:{
      height: 1,
      width: '100%',
      backgroundColor: themes.colors.lightGray,
    },

    optionFarm:{
      flex: 1,
      width: '100%',
      justifyContent: 'space-between',
    },

    optionsCard:{
      width: '100%',
      height: 40,
      gap: 10,
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 10,
      marginVertical: 10,
    },

    icons:{
      width: "22",
      height: "22",
    },

    title:{
      fontFamily: 'Poppins',
      fontSize: 14,
    },

    subtitle:{
      color: themes.colors.darkGray,
      fontFamily: 'Poppins',
      fontSize: 12,
    }


  });

export default styles;
