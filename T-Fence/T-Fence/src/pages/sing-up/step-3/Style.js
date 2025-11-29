import { StyleSheet } from "react-native";
import { themes } from "../../../global/themes";

const styles = StyleSheet.create({
container:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'top',
    padding: 30,
    paddingTop: 200,
},

boxTop:{
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    gap: 20,
},

boxCenter:{
    justifyContent: 'top',
    paddingTop: 20,
    width: '100%',
},

textBox:{
    alignItems: 'center',
    justifyContent: 'center',
},

 title:{
        fontFamily: 'Poppins-SemiBold',
        fontSize: 30,
    },

     text:{
        fontFamily: 'Poppins',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 14,
    },

imageTop:{
        width:80,
        height:80,
    },

})

export default styles;