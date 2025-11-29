import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

const styles = StyleSheet.create({

inputBox:{
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderRadius:5,
    alignItems: "center",
    flexDirection:'row',
    borderColor:themes.colors.greenGray,
    paddingLeft:15,
},

input:{
    width: '90%',
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color:themes.colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
}

})

export default styles;