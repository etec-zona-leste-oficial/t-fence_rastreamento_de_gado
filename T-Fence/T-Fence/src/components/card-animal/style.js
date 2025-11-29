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
},

CardCollar:{
    padding: 8,
    borderWidth: 1,
    borderColor: themes.colors.darkGray,
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    marginTop: 8
},

collarColunm:{
 flexDirection: 'row',
 gap: 3,
},

batteryColunm:{
 flexDirection: 'row',
 gap: 3,
},

statusColunm:{
 flexDirection: 'row',
 gap: 3,
},

animalColunm:{
 flexDirection: 'row',
 gap: 3,
},

colunm1:{
    // backgroundColor: 'red',
},

colunm2:{
    // backgroundColor: 'blue',
}

})

export default styles;