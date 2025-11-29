// src/navigation/MainTabNavigator.js
import themes from '../global/themes'
import { Image, ScrollView } from 'react-native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Usaremos ícones do Expo

import IconFenceInactive from '../assets/icons/IconFenceInactive.png';
import IconFenceActive from '../assets/icons/IconFenceActive.png';

import IconProfileInactive from '../assets/icons/IconProfileInactive.png';
import IconProfileActive from '../assets/icons/IconProfileActive.png';

import IconHomeInactive from '../assets/icons/IconHomeInactive.png';
import IconHomeActive from '../assets/icons/IconHomeActive.png';

import IconFarmInactive from '../assets/icons/exploreInactive.png';
import IconFarmActive from '../assets/icons/exploreActive.png';

import IconAnimalsInactive from '../assets/icons/IconAnimalsInactive.png';
import IconAnimalsActive from '../assets/icons/IconAnimalsActive.png';

// Páginas
import MapPage from '../pages/map/map';
import ProfileScreen from '../pages/Login/login';
import FencePage from '../pages/fence-page/FencePage'
import ProfilePage from '../pages/profile-page/ProfilePage'
import CollarPage from '../pages/collar-page/CollarPage'
import FarmPage from '../pages/farm-page/FarmPage';

//Navigations
import TopTabNavigator from './top.routes';

const Tab = createBottomTabNavigator();

export default function MainTabNavigator() {
  const { role } = useContext(AuthContext);
  console.log("role no bottom: " + role)
  return (
    <Tab.Navigator
      // Configurações aplicadas a todas as abas
      lazy={true}
      initialRouteName='Mapa'
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Mapa') {
            iconSource = focused ? IconFarmActive : IconFarmInactive;
          } else if (route.name === 'Perfil') {
            iconSource = focused ? IconProfileActive : IconProfileInactive;
          } else if (route.name === 'Cercas') {
            iconSource = focused ? IconFenceActive : IconFenceInactive;
          } else if (route.name === 'Monitoramento') {
            iconSource = focused ? IconAnimalsActive : IconAnimalsInactive;
          } else if (route.name === 'Propriedade') {
            iconSource = focused ? IconHomeActive : IconHomeInactive;
          }

          return (
            <Image
              source={iconSource}
              style={{ width: size, height: size }}
            />
          );
        },
        tabBarActiveTintColor: '#156C1E',
        tabBarInactiveTintColor: '#757575',
        headerShown: false,
      })}
    >
      {/* Telas que compõem as abas */}

      {/* <Tab.Screen name="Propriedade" component={ProfileScreen} /> */}
      {role == "owner" ? (

        <>
          <Tab.Screen name="Propriedade" component={FarmPage} options={{ unmountOnBlur: true, }} />
          <Tab.Screen name="Monitoramento" component={TopTabNavigator} options={{ unmountOnBlur: true, }} />
          <Tab.Screen name="Mapa" component={MapPage} options={{ unmountOnBlur: true, }} />
          <Tab.Screen name="Cercas" component={FencePage} options={{ unmountOnBlur: true, }} />
          <Tab.Screen name="Perfil" component={ProfilePage} options={{ unmountOnBlur: true, }} />
        </>

      ) : <>
        <Tab.Screen name="Mapa" component={MapPage} options={{ unmountOnBlur: true, }} />
        <Tab.Screen name="Perfil" component={ProfilePage} options={{ unmountOnBlur: true, }} /></>}
    </Tab.Navigator>
  );
}