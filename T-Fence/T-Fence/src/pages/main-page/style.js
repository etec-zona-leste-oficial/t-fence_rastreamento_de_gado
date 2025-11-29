import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        paddingTop: 0,
    },

    boxTop:{
        width: '100%',
        height: '58%',
    },

    boxCenter:{
        padding: 15,
        width: '100%',
        height: '37%',
        alignItems: 'left',
    },

    logoTfence:{
        marginBottom: 30,
        resizeMode: 'contain',
        width: 160,
        height: 30,
    },

    blockInfo:{
        marginBottom: 50
        
    },

    description:{
        fontFamily: 'Poppins',
        fontSize: 16,
    },

    imageMain:{
        resizeMode: 'contain',
        height: "100%",
        width: "100%",
    },

  });

export default styles;
