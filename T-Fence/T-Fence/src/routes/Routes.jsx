import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, View } from "react-native";
import { useState, useContext  } from "react";
import { AuthContext } from '../context/AuthContext';
import {themes} from '../global/themes'
import Main from "../pages/main-page/main";
import Login from "../pages/Login/login";
import Step1 from "../pages/sing-up/step-1/Step1";
import Step2 from "../pages/sing-up/step-2/Step2";
import Step3 from "../pages/sing-up/step-3/Step3";
import Step4 from "../pages/sing-up/step-4/Step4";
import RegisterPropertyStep1 from "../pages/register-property/register-property-step1/register-property-step1";
import RegisterPropertyStep2 from "../pages/register-property/register-property-step2/register-property-step2";
import RegisterPropertyStep3 from "../pages/register-property/register-property-step3/register-property-step3";
import RegisterPropertyStep4 from "../pages/register-property/register-property-step4/register-property-step4";
import RegisterPropertyStep5 from "../pages/register-property/register-property-step5/register-property-step5";
import NotificationPage from '../pages/profile-page/notification/NotificationPage'
import AccountPage from '../pages/profile-page/account/AccountPage';
import EditName from "../pages/profile-page/account/editName/editName";
import EditEmail from "../pages/profile-page/account/editEmail/editEmail";
import EditPhone from "../pages/profile-page/account/editPhone/editPhone";
import EditLock from "../pages/profile-page/account/editLock/editLock";
import PropertyPage from "../pages/farm-page/property-page/PropertyPage";
import ColaboratorPage from "../pages/farm-page/colaborator-page/colaboratorPage";
import RequestCollaborators from "../pages/request-collaborator/RequestCollaborators";
import RequestCollaboratorsAwaiting from "../pages/request-collaborator-awaiting/RequestCollaboratorsAwaiting";
import EditNameFarm from "../pages/farm-page/property-page/editName/editName";
import EditInfo from "../pages/farm-page/property-page/editInfo/editInfo";
import EditArea from "../pages/farm-page/property-page/editArea/editArea";
import PendingRequestCollaborators from "../pages/farm-page/request-colaborator-page/requestColaboratorPage";

import MainTabNavigator from './bottomNavigator.routes';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFonts } from "expo-font";


const Stack = createNativeStackNavigator();

const AuthRoutes = ({userToken, propertyInfo, requestCollaborate}) => (
  
  <Stack.Navigator
        initialRouteName={ !propertyInfo && userToken && requestCollaborate == 'true' ? "RequestCollaboratorsAwaiting" : !propertyInfo && userToken ? "RegisterPropertyStep1" : "Main"}
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#ffffff' }
        }}
  >     
        <Stack.Screen name="Main" component={Main} options={{ title: 'Main' }} />
        <Stack.Screen name="Login" component={Login} options={{ title: 'Login' }} />
        <Stack.Screen name="SingUp" component={Step1} options={{ title: 'SingUp' }} />
        <Stack.Screen name="Step2" component={Step2} options={{ title: 'Step2' }} />
        <Stack.Screen name="Step3" component={Step3} options={{ title: 'Step3' }} />
        <Stack.Screen name="Step4" component={Step4} options={{ title: 'Step4' }} />
        <Stack.Screen name="RequestCollaboratorsAwaiting" component={RequestCollaboratorsAwaiting} options={{ title: 'RequestCollaboratorsAwaiting' }} />
        <Stack.Screen name="RequestCollaborators" component={RequestCollaborators} options={{ title: 'RequestCollaborators' }} />
        <Stack.Screen name="RegisterPropertyStep1" component={RegisterPropertyStep1} options={{ title: 'RegisterPropertyStep1' }} />
        <Stack.Screen name="RegisterPropertyStep2" component={RegisterPropertyStep2} options={{ title: 'RegisterPropertyStep2' }} />
        <Stack.Screen name="RegisterPropertyStep3" component={RegisterPropertyStep3} options={{ title: 'RegisterPropertyStep3' }} />
        <Stack.Screen name="RegisterPropertyStep4" component={RegisterPropertyStep4} options={{ title: 'RegisterPropertyStep4' }} />
        <Stack.Screen name="RegisterPropertyStep5" component={RegisterPropertyStep5} options={{ title: 'RegisterPropertyStep5' }} />

  </Stack.Navigator>
);

const AppRoutes = () => (
  <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#ffffff' }
        }}
  >
        <Stack.Screen name="MainTabs" component={MainTabNavigator} />
        <Stack.Screen name="RegisterPropertyStep1" component={RegisterPropertyStep1} options={{ title: 'RegisterPropertyStep1' }} />
        <Stack.Screen name="Notification" component={NotificationPage} options={{ title: 'Notification' }} />
        <Stack.Screen name="Account" component={AccountPage} options={{ title: 'Account' }} />
        <Stack.Screen name="EditName" component={EditName} options={{ title: 'EditName' }} />
        <Stack.Screen name="EditEmail" component={EditEmail} options={{ title: 'EditEmail' }} />
        <Stack.Screen name="EditLock" component={EditLock} options={{ title: 'EditLock' }} />
        <Stack.Screen name="EditPhone" component={EditPhone} options={{ title: 'EditPhone' }} />
        <Stack.Screen name="Property" component={PropertyPage} options={{ title: 'Property' }} />
        <Stack.Screen name="RequestCollaborators" component={RequestCollaborators} options={{ title: 'RequestCollaborators' }} />
        <Stack.Screen name="RegisterPropertyStep2" component={RegisterPropertyStep2} options={{ title: 'RegisterPropertyStep2' }} />
        <Stack.Screen name="RegisterPropertyStep3" component={RegisterPropertyStep3} options={{ title: 'RegisterPropertyStep3' }} />
        <Stack.Screen name="RegisterPropertyStep4" component={RegisterPropertyStep4} options={{ title: 'RegisterPropertyStep4' }} />
        <Stack.Screen name="RegisterPropertyStep5" component={RegisterPropertyStep5} options={{ title: 'RegisterPropertyStep5' }} />
        <Stack.Screen name="ColaboratorPage" component={ColaboratorPage} options={{ title: 'ColaboratorPage' }} />
        <Stack.Screen name="EditNameFarm" component={EditNameFarm} options={{ title: 'EditNameFarm' }} />
        <Stack.Screen name="EditArea" component={EditArea} options={{ title: 'EditArea' }} />
        <Stack.Screen name="EditInfo" component={EditInfo} options={{ title: 'EditInfo' }} />
        <Stack.Screen name="PendingRequestCollaborators" component={PendingRequestCollaborators} options={{ title: 'PendingRequestCollaborators' }} />

  </Stack.Navigator>
);

export default function Routes() {
  const { userToken, propertyInfo, isLoading, requestCollaborate } = useContext(AuthContext);
  console.log("Request is is: "+ requestCollaborate)
  if (isLoading) {
      return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={themes.colors.green}/>
          </View>
      );
  }

  return userToken && propertyInfo ? <AppRoutes/> : <AuthRoutes requestCollaborate={requestCollaborate} userToken={userToken} propertyInfo={propertyInfo}/> ;
}


