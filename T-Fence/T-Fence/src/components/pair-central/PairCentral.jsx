import React from 'react'
import { BleManager } from "react-native-ble-plx";
import { View, Text, TextInput, TouchableOpacity, Image, Platform, PermissionsAndroid, Alert, ScrollView, Linking, ActivityIndicator } from "react-native";
import { useState, useEffect, useContext  } from "react";
import style from './Style'
import {themes} from '../../global/themes'
import {MaterialIcons} from '@expo/vector-icons'
import AddIcon from '../../assets/icons/add.png'
import Input from "../input/input";
import Button from '../button/button'
import Permission from '../permission/Permission.jsx';
import AlertCustom from '../../components/alert/Alert.jsx'
import {AuthContext} from '../../context/AuthContext'

const manager = new BleManager();

// UUIDs do ESP32
const SERVICE_UUID = "12345678-1234-5678-1234-56789abcdef0";
const CHAR_WIFI_UUID = "abcd1234-5678-1234-5678-abcdef123456";
const STATUS_CHAR_UUID = "abcd5678-5678-1234-5678-abcdef654321";

export default function createCollar({closedScreen}) {
  const { propertyInfo } = useContext(AuthContext);
  const [createScreen, SetCreateScreen] = useState(false);
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [property_id, setProperty_id] = useState("68e3c5564cdcb85c0105be1c");
  const [errorToConnect, setErrorToConnect] = useState(false);
  const [connetionFailed, setConnetionFailed] = useState(false);
  const [failedToConnectDevice, setFailedToConnectDevice] = useState(false);
  const [success, setSuccess] = useState(false);
  const [permissionBluetooth, setPermissionBluetooth] = useState(false);
  const [permissionGps, setPermissionGps] = useState(false);
  const [connectedDevice, setConnectedDevice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
      requestPermissions();
      return () => manager.destroy();
    }, []);
  
    // Solicita permissões BLE / localização
    const requestPermissions = async () => {
    if (Platform.OS === "android" && Platform.Version >= 31) {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);

      // Verifica se TODAS foram dadas
      const allGranted = Object.values(granted).every(
        (v) => v === PermissionsAndroid.RESULTS.GRANTED
      );

      if (allGranted) {
        return true; // Sucesso!
      }

      // Se não foram dadas, verifica se alguma foi "Negada Permanentemente"
      const isPermanentlyDenied = Object.values(granted).some(
        (v) => v === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      );

      if (isPermanentlyDenied) {
        // Se foi negada permanentemente, oferece para abrir as Configurações
        setPermissionGps(true);
      } else {
        // Foi apenas "Negado" desta vez, pode pedir de novo depois
        Alert.alert(
          "Permissões necessárias",
          "Para encontrar a Central, precisamos da sua permissão para 'Dispositivos próximos' (Bluetooth) e 'Localização'.",
          [{ text: "OK" }]
        );
      }
      return false; // Falhou
    }
    return true;
  };
  
    // Inicia scan de dispositivos
    const startScan = () => {
      console.log("Iniciando scan...");
      setDevices([]);
      setScanning(true);
  
      const subscription = manager.onStateChange((state) => {
        if (state === "PoweredOn") {
          scanDevices();
          subscription.remove();
        }
        // Se o Bluetooth estiver desligado
      else if (state === "PoweredOff") {
        setPermissionBluetooth(true);
        // Alert.alert(
        //   "Bluetooth Desligado", 
        //   "Por favor, ative o Bluetooth para escanear as Centrais.",
        //   [{ text: "OK" }]
        // );
        // setScanning(false); // Para de "carregar"
        // subscription.remove();
      } 
      // Se as permissões foram negadas (redundante, mas bom ter)
      else if (state === "Unauthorized") {
        Alert.alert(
          "Permissões Negadas", 
          "Não temos autorização para usar o Bluetooth. Por favor, verifique as configurações do aplicativo.",
          [{ text: "OK" }]
        );
        setScanning(false); // Para de "carregar"
        subscription.remove();
      }
      }, true);
    };
  
    const scanDevices = () => {
      manager.startDeviceScan(null, null, (error, device) => {
        if (error) {
          console.log("Erro no BLE:", error);
          setScanning(false);
          return;
        }
        if (device && device.name?.includes("ESP")) {
          setDevices(prev => {
            if (prev.find(d => d.id === device.id)) return prev;
            return [...prev, device];
          });
          console.log("Dispositivo encontrado:", device.name);
        }
      });
  
      // Para scan após 20 segundos
      setTimeout(() => {
        manager.stopDeviceScan();
        setScanning(false);
        console.log("Scan parado.");
      }, 20000);
    };
  
    // Conecta ao ESP32 selecionado
    const connectToDevice = async (device) => {
      try {
        console.log("Conectando ao dispositivo:", device.name);
        const d = await device.connect();
        await d.discoverAllServicesAndCharacteristics();
        setConnectedDevice(d);
        // Alert.alert("Conectado", `Dispositivo ${device.name} conectado!`);
  
        // Inicia monitoramento do status Wi-Fi
        monitorWiFiStatus(d);
      } catch (err) {
        setFailedToConnectDevice(true);
        console.log("Erro ao conectar:", err);
        // Alert.alert("Erro", "Falha ao conectar ao dispositivo");
      }
    };
  
    // Envia SSID e senha via BLE
    const sendWiFiCredentials = async () => {
      setIsLoading(true);
      if (!connectedDevice) return Alert.alert("Erro", "Nenhum dispositivo conectado");
      const data = `${ssid};${password};${propertyInfo._id}`; // Formato esperado pelo ESP32
      try {
        await connectedDevice.writeCharacteristicWithResponseForService(
          SERVICE_UUID,
          CHAR_WIFI_UUID,
          btoa(data)
        );
        // Alert.alert("Sucesso", "SSID e senha enviados!");
      } catch (err) {
        console.log("Erro ao enviar dados:", err);
        setConnectedDevice(null);
        setConnetionFailed(true);
        setIsLoading(false);
        // Alert.alert("Erro", "Falha ao enviar SSID/senha");
      }
    };
  
    // Monitora a característica de status Wi-Fi
    const monitorWiFiStatus = async (device) => {
  try {
    console.log("Iniciando monitoramento BLE...");
    device.monitorCharacteristicForService(
      SERVICE_UUID,
      STATUS_CHAR_UUID,
      (error, characteristic) => {
        if (error) {
          console.log("Erro no monitoramento:", error);
          return;
        }

        if (characteristic?.value) {
          const mensagem = atob(characteristic.value);
          console.log("📡 Mensagem do ESP32:", mensagem);

          // Exibe alertas automáticos conforme a mensagem
          if (mensagem.includes("OK")) {
            setErrorToConnect(false);
            setIsLoading(false);
            setSuccess(true);
          
            // console.log("Conexão Wi-Fi bem-sucedida.");
            // Alert.alert("Sucesso", mensagem);
          } else if (mensagem.includes("ERRO")) {
            setIsLoading(false);
            setErrorToConnect(true);
            console.log("Erro na conexão Wi-Fi.");
            // Alert.alert("Erro", mensagem);
          } else {
            Alert.alert("Status", mensagem);
          }
        }
      }
    );
  } catch (err) {
    console.log("Erro ao monitorar status Wi-Fi:", err);
  }
};

// Desconecta do dispositivo BLE
const disconnectFromDevice = async () => {
    console.log("Iniciando desconexão...");

    if (connectedDevice) {
      try {
        await connectedDevice.cancelConnection();
        console.log("Dispositivo desconectado.");
      } catch (err) {
        console.log("Erro ao desconectar:", err);
      }
    }
    
    // Limpa o estado *depois* de desconectar
    setConnectedDevice(null);
    setErrorToConnect(false); // Também limpa qualquer erro
    setIsLoading(false);      // Para o loading
  };


    //Função 
    useEffect(() => {
      if(createScreen && !connectedDevice){
      startScan();
      }
    }, [createScreen]);
    

    useEffect(() => {
      let interval = null
      if(createScreen && !connectedDevice){
      interval = setInterval(() => {
      startScan();
    }, 21000);
  }
    return () => clearInterval(interval); // limpa o intervalo ao desmontar
      }, [createScreen]);

  return (
    
    <>
    <View style={style.pairCentral} >
    <Text style={[{fontFamily: "Poppins-Medium"}]} >Por favor, emparelhe uma central para utilizar as coleiras</Text>
    <Button
      onPress={() => {SetCreateScreen(true);}}
      texto={"Emparelhar Central"}
      typeButton={"full"}
    />
    </View>
  {createScreen && 
    <View style={[style.FullyScreen, {display: createScreen ? "block" : "block"}]}>

    <View style={style.CreateScreen}>

      <Text style={style.titleScreen}>
        Emparelhar Central
      </Text>
      
      <Text style={[style.subtitleScreen]}>
        {!connectedDevice ? "Selecione um dispositivo:" : "Dispositivo conectado: " + connectedDevice.name}
      </Text>

      {!connectedDevice && (
        <View style={style.listDevices} >
        {devices.map((d, i) => (
          <Button
        key={i}
        onPress={() => connectToDevice(d)}
        texto={d.name}
        typeButton={"Shadow"}
        />   
        ))
        }
        { scanning && <ActivityIndicator style={{marginTop: 15}} size="30" color={themes.colors.green}/> }
      </View>
      )}

        {connectedDevice ? (
            <View>
              <Input
                keyboardType="text"
                onChangeText={setSsid}
                value={ssid}
                Propwidth={"100%"}
                placeholder={'Nome da rede (SSID)'}
              />

              <Input
                keyboardType="text"
                onChangeText={setPassword}
                value={password}
                Propwidth={"100%"}
                placeholder={'Senha da rede'}
              />
              {errorToConnect ? <Text style={{color: 'red', marginBottom: 10}}>Erro ao conectar à rede Wi-Fi. Verifique as credenciais e tente novamente.</Text> : null}

              <Button
                texto={isLoading ? <ActivityIndicator style={{marginTop: 15}} size="30" color="white"/> : "Enviar Wi-Fi"}
                onPress={sendWiFiCredentials}
              />
              <Button
                onPress={disconnectFromDevice}
                texto={"Cancelar"}
                typeButton={"Shadow"}
              />
            </View>
          ) : (
            <View style={style.buttons}>
            <Button
            onPress={async () => {
              await disconnectFromDevice();
              SetCreateScreen(false);
              // closedScreen();
            }}
            texto={"Fechar"}
            typeButton={"Shadow"}
            />
        </View>
          )}

        
        
      </View>
      { permissionBluetooth &&
        <Permission
          type={"Bluetooth"}
          onPress={() => setPermissionBluetooth(false)}
        />
      }

      { permissionGps &&
        <Permission
          type={"gps"}
          onPress={() => setPermissionGps(false)}
        />
      }
      { success &&
      <AlertCustom
      type={"Success"}
      title={"Central emparelhada!"}
      message={"Central emparelhada com sucesso, agora você pode cadastrar coleiras e rastrear animais"}
      onPress={() => closedScreen()}
    />
    }

    { connetionFailed &&
      <AlertCustom
      type={"Error"}
      title={"Ocorreu um erro"}
      message={"Falha ao enviar as credenciais Wi-Fi. Por favor, tente novamente."}
      onPress={() => setConnetionFailed(false)}
    />
    }

    { failedToConnectDevice &&
      <AlertCustom
      type={"Error"}
      title={"Ocorreu um erro"}
      message={"Falha ao se conectar ao dispositivo. Por favor, tente novamente."}
      onPress={() => setFailedToConnectDevice(false)}
    />
    }
    </View>
}
    </>
  )
}

