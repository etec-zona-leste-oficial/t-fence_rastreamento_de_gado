import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'Left',
        justifyContent: 'top',
        padding: 20,
    },

    cardAnimal:{
        padding: 10,
        width: "100%",
        height: 130,
        borderColor: themes.colors.darkGray,
        borderWidth: 1,
        borderRadius: 5, 
        justifyContent: "center"
    },

    infoAnimal:{
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },

    table:{
        flexDirection: 'row',
        gap: 15,
    },

    titleCard:{
        fontFamily: "Poppins-Medium",
        fontSize: 16
    },

    OxIcon:{
        resizeMode: "contain",
        width: 90,
        height: 90,
    },

    cardCollar:{
        padding: 10,
        width: "100%",
        height: 130,
        borderColor: themes.colors.darkGray,
        borderWidth: 1,
        borderRadius: 5, 
        justifyContent: "center",
        marginTop: 15,
    },

    infoCollar:{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },

    table:{
        flexDirection: 'row',
        gap: 15,
    },

    titleCard:{
        fontFamily: "Poppins-Medium",
        fontSize: 16
    },

    CollarIcon:{
        resizeMode: "contain",
        width: 90,
        height: 90,
    },

    textColunm1:{
        fontFamily: "Poppins-Regular",
        fontSize: 14,
    },

    textColunm2:{
        fontFamily: "Poppins-Regular",
        fontSize: 14,
        color: themes.colors.darkGray
    },

  pulse: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(255, 0, 0, 0.3)',
    borderRadius: 25,
  },

  dot: {
    justifyContent: "center",
    alignItems: "center",
    width: 15,
    height: 15,
    backgroundColor: 'red',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'white',
    position: "absolute",
    top: "20%",
    left: "20%",
  },



  });

export default styles