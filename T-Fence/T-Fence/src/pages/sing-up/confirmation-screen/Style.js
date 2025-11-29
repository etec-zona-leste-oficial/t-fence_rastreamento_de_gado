import { StyleSheet } from "react-native";
import { themes } from "../../../global/themes";

const styles = StyleSheet.create({
container:{
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
    // backgroundColor: 'green'
},

boxTop:{
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    height: '30%',
},

boxCenter:{
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '30%',
    
},

boxBottom:{
    height: '30%',
    width: '100%',
    
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

imgConcluido:{
        width:80,
        height:80,
    },

})

export default styles;