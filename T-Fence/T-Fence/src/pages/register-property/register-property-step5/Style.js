import { StyleSheet } from "react-native";
import { themes } from "../../../global/themes";

const styles = StyleSheet.create({
    container:{
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'top',
        padding: 20,
        paddingTop: 150,
    },

    scrollView:{
        width: "100%"
    },

    boxTop:{
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: '100%',
        gap: 10,
    },

    proprietyCard:{
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        marginBottom: 9,
        flexDirection: "row",
        borderColor: themes.colors.darkGray,
    },

    colunm2:{
        marginLeft: 20,
    },

    informationColumn:{
        flexDirection: "row",
        gap: 18,
    },

    cardInformation:{
        marginLeft: 20,
    },

    desciptionCard:{
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        borderColor: themes.colors.darkGray,
    },

    titleDescription:{
        fontFamily: "Poppins-SemiBold"
    },

    titleInformation:{
        fontFamily: "Poppins-SemiBold"
    },

    description:{
        fontFamily: "Poppins-medium",
        color: themes.colors.darkGray,
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
        marginTop: 10,
        marginBottom: 10,
        fontSize: 14,
    },

    fieldsText:{
        fontFamily: 'Poppins-Regular',
        color: themes.colors.darkGray,
        fontSize: 14,
    },

    imageTop:{
        borderColor: themes.colors.green,
        width:280,
        height:200,
    },

    farmingIcon:{
        width:70,
        height:70,
    },

    MapIcon:{
        width:70,
        height:70,
    },

})

export default styles;