import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

const styles = StyleSheet.create({

notificationCard:{
    padding: 8,
    borderWidth: 1,
    borderColor: themes.colors.lightGray,
    borderRadius: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 10,
},

info:{
    flexDirection: "colunm",
},

block2:{
    flexDirection: 'row',
    justifyContent: "bottom",
    alignItems: "flex-end"
},

title:{
    fontFamily: "Poppins-Medium",
    fontSize: 16,
    height: 22,
    
},

status:{
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    alignItems: "center",
    color: themes.colors.darkGray,
    fontSize: 14,
    height: 22,
},

description:{
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: themes.colors.darkGray,
    width: "78%",
},

hour:{
    height: 20,
    fontFamily: "Poppins-Regular",
    fontSize: 14,
    color: themes.colors.darkGray,
},


})

export default styles;