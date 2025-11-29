import { StyleSheet } from "react-native";
import { themes } from "../../global/themes";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.white,
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 100,
    padding: 30,
  },

  form: {
    width: "100%",
    alignItems: "center",
    flex: 1,
    gap: '65%',
  },

  boxInput: {
    width: '100%',
  }
});

export default styles;
