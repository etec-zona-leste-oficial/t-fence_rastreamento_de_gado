import { StyleSheet } from "react-native";
import {themes} from '../../../global/themes'

const styles = StyleSheet.create({
    container:{
          flex: 1,
          width: '100%',
          alignItems: 'center',
          justifyContent: 'top',
          padding: 30,
          paddingTop: 100,
    },

    optionsNotification:{
      paddingTop: 10,
      flex: 1,
      width: '100%',
      gap: 10,
    },

    optionsCard:{
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 14,
    },

    icon:{
      height: '40',
      width: '40'
    },

    notificationIcon:{
      height: '30',
      width: '30'
    },

    arrowIcon:{
      height: '20',
      width: '20'
    },

    boxImage:{
      width: 35, // Largura fixa para o ícone
        height: 35, // Altura fixa
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15, // Espaçamento entre ícone e texto
    },

    boxText:{
        flex: 1, // Permite que o texto cresça e empurre o switch para a direita
        justifyContent: 'center',
        marginRight: 15, // Espaçamento para o switch
    },

    boxSwitch:{
    width: 50, // Largura suficiente para o switch
    alignItems: 'center',

    },

     title:{
      fontFamily: 'Poppins',
      fontSize: 14,
      lineHeight: 18
    },

    subtitle:{
      color: themes.colors.darkGray,
      fontFamily: 'Poppins',
      fontSize: 12,
    }
  });

export default styles;
