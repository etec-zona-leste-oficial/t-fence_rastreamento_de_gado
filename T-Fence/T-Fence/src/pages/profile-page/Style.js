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

    headerProfile:{
      width: "100%",
      height: "20%",
      alignItems: "center",
      flexDirection: "row",
      gap: 20,
    },

    profileImage:{
      width: "84",
      height: "84",
    },

    mailImage:{
      width: "16",
      height: "16",
    },

    userInformations:{
      justifyContent: "center",
      alignContent: 'center',
    },

    email:{
      flexDirection: "row",
      alignItems: "center",
      gap: 5,
    },

    userName:{
      width: "60%",
      fontSize: 20,
      fontFamily: 'Poppins-Medium',
    },

    userEmail:{
      fontFamily: 'Poppins',
    },

    verticalSeparator:{
      height: 1,
      width: '100%',
      backgroundColor: themes.colors.lightGray,
    },

    optionProfile:{
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
