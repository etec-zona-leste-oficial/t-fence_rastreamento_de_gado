import { StyleSheet } from "react-native";
import {themes} from '../../../../global/themes'

const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'top',
    padding: 16,
    paddingTop: 50
  },

  content:{
    flex: 1,
    marginTop: 50,
    width: "100%",
    justifyContent: "space-between",
    marginBottom: 30,
  },

  inputs:{
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
  }
   
  });

export default styles;
