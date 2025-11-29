import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'Left',
        justifyContent: 'top',
        padding: 20,
    },

    titleHeader:{
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      marginTop: 20,
      marginBottom: 20,
      fontFamily: "Poppins-Medium",
      fontSize: 20,
    },

    Fence:{
      marginTop: 10,
      height:"63%"
    },

    titleFence:{
      fontFamily: "Poppins-SemiBold",
      fontSize: 16,
    },

    ListFence:{
      marginTop: 0,
      gap: 8,
    },

    containerMap:{
      width: "100%",
      height: "219",
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

export default styles