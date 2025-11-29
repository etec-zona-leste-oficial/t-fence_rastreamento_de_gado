import { StyleSheet } from "react-native";
import { themes } from "../../../global/themes";

const styles = StyleSheet.create({
container:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'top',
    padding: 30,
    paddingTop: 150,
},

ComboInput:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
},

boxTop:{
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 10,
},

boxCenter:{
    justifyContent: 'top',
    paddingTop: 0,
    width: '100%',
},

textBox:{
    alignItems: 'center',
    justifyContent: 'center',
},

 title:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30,
        textAlign: 'center',
    },

     text:{
        fontFamily: 'Poppins',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
    },

imageTop:{
    borderWidth: 2,
    borderColor: themes.colors.green,
    borderRadius: 10,
    width:"100%",
    height:200,
    },

})

export default styles;