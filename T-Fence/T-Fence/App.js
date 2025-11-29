import { useState, useEffect, useRef, useContext } from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { useFonts } from "expo-font";
import Routes from './src/routes/Routes.jsx';
import { View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider, AuthContext } from './src/context/AuthContext.js';

// Handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Função HELPER
async function registerForPushNotificationsAsync() {
  let token;

  // Só funciona em dispositivos físicos, não em simuladores
  if (!Device.isDevice) {
    alert('Must use physical device for Push Notifications');
    return;
  }

  // Pede permissão
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  // Pega o Token
  try {
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
  } catch (e) {
    console.error(e);
  }

  // Configuração específica do Android (Canal de Notificação)
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}

function NotificationHandler() {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const { saveNotificationToken } = useContext(AuthContext);

  useEffect(() => {
    registerForPushNotificationsAsync().then(async (token) => {
      console.log("TOKEN DE PUSH:", token);
      setExpoPushToken(token);
      if (token) await saveNotificationToken(token);
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log("Notificação recebida:", notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log("Notificação clicada:", response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return null; // não precisa renderizar nada
}

export default function App() {

  // Carrega as fontes para a aplicação inteira
  const [fontsLoaded] = useFonts({
    Poppins: require(
      "./src/assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("./src/assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("./src/assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Medium": require("./src/assets/fonts/Poppins-Medium.ttf"),
  });

  // Mostra uma tela em branco enquanto as fontes carregam
  if (!fontsLoaded) {
    return null;
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#ffffff', // Define o fundo global como branco
    },
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <NotificationHandler />
        <SafeAreaProvider>
          <NavigationContainer theme={MyTheme}>
            <Routes />
          </NavigationContainer>
        </SafeAreaProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}