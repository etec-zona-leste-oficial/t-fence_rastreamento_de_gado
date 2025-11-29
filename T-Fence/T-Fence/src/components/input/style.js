import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

const styles = StyleSheet.create({

inputBox:{
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderRadius:5,
    // alignItems: "center", //Resolveu em partes...
    flexDirection:'row',
    borderColor:themes.colors.greenGray,
    paddingLeft:15,
    marginTop:15,
},

input:{
    width: '90%',
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color:themes.colors.lightGreen,
}

})

export default styles;