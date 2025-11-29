import { StyleSheet } from "react-native";
import { themes } from "../../../global/themes";

const style = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    padding: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'top',

  },

  optionAccount: {   //div que engloba as opções
    paddingTop: 10,
    width: '100%',
    flex: 1,
    gap: 10
  },

  option: {         //div dos cards
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },

  imageView: {
    width: 35, // Largura fixa para o ícone
    height: 35, // Altura fixa
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15, // Espaçamento entre ícone e texto
  },

  icons: {
    width: 30,
    height: 30,
  },

  textView: {
    flex: 1, // Permite que o texto cresça e empurre o switch para a direita
    justifyContent: 'center',
    marginRight: 15, // Espaçamento para o switch
  },

  iconView: {
    width: 50, 
    alignItems: 'center',
  },

  title: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: themes.colors.black,
    marginRight: 28,
    lineHeight: 18
  },

  subtitle: {
    fontFamily: "Poppins",
    fontSize: 13,
    
    color: themes.colors.darkGray,
  },

});

export default style;
