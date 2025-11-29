import { StyleSheet } from "react-native";
import {themes} from '../../global/themes'

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row', // coloca as caixas lado a lado
        justifyContent: 'center',    
    },

    input: {
        borderWidth: 3,
        borderColor: themes.colors.greenGray,
        borderRadius: 5,
        width: 50,
        height: 50,
        textAlign: 'center',
        fontWeight: 'bold',
        color: themes.colors.green,
        backgroundColor: themes.colors.whiteGreen,
        margin: '5',
        fontSize: 22,
  },
});

export default styles;