import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, Platform, PermissionsAndroid, Alert, ScrollView } from "react-native";
import { BleManager } from "react-native-ble-plx";

const manager = new BleManager();

// UUIDs do ESP32
const SERVICE_UUID = "12345678-1234-5678-1234-56789abcdef0";
const CHAR_WIFI_UUID = "abcd1234-5678-1234-5678-abcdef123456";
const STATUS_CHAR_UUID = "status1234-5678-1234-5678-abcdef123456";

export default function CentralPage() {
  const [devices, setDevices] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [ssid, setSsid] = useState("");
  const [password, setPassword] = useState("");
  const [connectedDevice, setConnectedDevice] = useState(null);

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
      const allGranted = Object.values(granted).every(v => v === "granted");
      if (!allGranted) Alert.alert("Permissões BLE negadas");
    }
  };

  // Inicia scan de dispositivos
  const startScan = () => {
    setDevices([]);
    setScanning(true);

    const subscription = manager.onStateChange((state) => {
      if (state === "PoweredOn") {
        scanDevices();
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

    // Para scan após 10 segundos
    setTimeout(() => {
      manager.stopDeviceScan();
      setScanning(false);
      console.log("Scan parado.");
    }, 10000);
  };

  // Conecta ao ESP32 selecionado
  const connectToDevice = async (device) => {
    try {
      console.log("Conectando ao dispositivo:", device.name);
      const d = await device.connect();
      await d.discoverAllServicesAndCharacteristics();
      setConnectedDevice(d);
      Alert.alert("Conectado", `Dispositivo ${device.name} conectado!`);

      // Inicia monitoramento do status Wi-Fi
      monitorWiFiStatus(d);
    } catch (err) {
      console.log("Erro ao conectar:", err);
      Alert.alert("Erro", "Falha ao conectar ao dispositivo");
    }
  };

  // Envia SSID e senha via BLE
  const sendWiFiCredentials = async () => {
    if (!connectedDevice) return Alert.alert("Erro", "Nenhum dispositivo conectado");
    const data = `${ssid};${password}`; // Formato esperado pelo ESP32
    try {
      await connectedDevice.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHAR_WIFI_UUID,
        btoa(data) // codifica em Base64
      );
      Alert.alert("Sucesso", "SSID e senha enviados!");
    } catch (err) {
      console.log("Erro ao enviar dados:", err);
      Alert.alert("Erro", "Falha ao enviar SSID/senha");
    }
  };

  // Monitora a característica de status Wi-Fi
  const monitorWiFiStatus = async (device) => {
    try {
      device.monitorCharacteristicForService(
        SERVICE_UUID,
        STATUS_CHAR_UUID,
        (error, characteristic) => {
          if (error) {
            console.log("Erro no monitoramento:", error);
            return;
          }
          if (characteristic?.value) {
            const status = atob(characteristic.value); // decodifica Base64
            console.log("Status Wi-Fi ESP32:", status);
            Alert.alert("Status Wi-Fi", status === "conectado" ? "Conectado!" : "Falha ao conectar");
          }
        }
      );
    } catch (err) {
      console.log("Erro ao monitorar status Wi-Fi:", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 20 }}>
      <Button title={scanning ? "Escaneando..." : "Iniciar Scan"} onPress={startScan} disabled={scanning} />

      <Text style={{ fontSize: 18, marginVertical: 10 }}>Dispositivos encontrados:</Text>
      {devices.map((d, i) => (
        <Button key={i} title={d.name} onPress={() => connectToDevice(d)} />
      ))}

      {connectedDevice && (
        <View style={{ marginTop: 20 }}>
          <Text>Dispositivo conectado: {connectedDevice.name}</Text>
          <TextInput
            placeholder="SSID Wi-Fi"
            value={ssid}
            onChangeText={setSsid}
            style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
          />
          <TextInput
            placeholder="Senha Wi-Fi"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{ borderWidth: 1, marginVertical: 5, padding: 5 }}
          />
          <Button title="Enviar Wi-Fi" onPress={sendWiFiCredentials} />
        </View>
      )}
    </ScrollView>
  );
}
