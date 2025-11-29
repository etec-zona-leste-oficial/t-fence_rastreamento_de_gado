import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import {themes} from '../global/themes'

//Imagens
import CollarIconActive from "../assets/icons/collarIconActive.png"
import OxIconActive from "../assets/icons/oxIconActive.png"

// Importe das telas
import AnimalPage from '../pages/animal-page/AnimalPage'
import CollarPage from '../pages/collar-page/CollarPage'

const Tab = createMaterialTopTabNavigator();

export default function TopTabNavigator() {
  const insets = useSafeAreaInsets();
  return (
    <Tab.Navigator
      initialRouteName="Collar"
      style={{ paddingTop: insets.top }} 
      screenOptions={{
        tabBarActiveTintColor: themes.colors.green, 
        tabBarInactiveTintColor: themes.colors.darkGray, 
        tabBarLabelStyle: { fontSize: 18, fontFamily: 'Poppins-Medium' },
        tabBarStyle: {
          backgroundColor: 'transparent', 
          elevation: 0,                  
          shadowOpacity: 0,              
        },
        tabBarIndicatorStyle: {
          backgroundColor: themes.colors.green, 
          height: 3,
        },
        tabBarShowIcon: true, 
        tabBarItemStyle: { flexDirection: 'row', alignItems: 'center' },
        tabBarPressColor: 'transparent',  
        tabBarPressOpacity: 1,
      }}
    >
      <Tab.Screen
        name="Collar"
        component={CollarPage}
        options={{
             tabBarLabel: 'Coleiras',
             tabBarIcon: ({ color }) => (

            <Image
              source={CollarIconActive}
              style={{ width: 28, height: 28, tintColor: color }}
            />
          ), }}
      />
      <Tab.Screen
        name="Animals"
        component={AnimalPage}
        options={{
             tabBarLabel: 'Animais',
             tabBarIcon: ({ color }) => (

            <Image
              source={OxIconActive}
              style={{ width: 28, height: 28, tintColor: color }}
            />
          ),
         }}
      />
    </Tab.Navigator>
  );
}
