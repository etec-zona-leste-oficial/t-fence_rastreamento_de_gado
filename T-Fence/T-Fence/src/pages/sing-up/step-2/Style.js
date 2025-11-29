import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'top',
        padding: 30,
        paddingTop: 200,
        // backgroundColor: 'lightblue',
    },

    boxTop:{
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
    },

    boxCenter:{
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
    },

    imageTop:{
        width: 80,
        height: 80,

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
    }
})

export default styles