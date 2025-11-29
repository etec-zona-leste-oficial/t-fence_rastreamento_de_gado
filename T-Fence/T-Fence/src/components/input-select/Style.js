import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

const styles = StyleSheet.create({

pickerWrapper: {
    borderWidth: 2,
    borderColor: themes.colors.greenGray,
    borderRadius: 5,
    overflow: "hidden",
    height: 50,
    justifyContent: 'center',
    marginTop: 15,
  },

  picker: {
    fontFamily: 'Poppins-Medium',
    color:  themes.colors.lightGreen,
    fontSize: 14,
  },

})

export default styles;