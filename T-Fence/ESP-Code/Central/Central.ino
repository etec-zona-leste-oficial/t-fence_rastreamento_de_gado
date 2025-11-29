// Central Receptora

#include <SPI.h>
#include <LoRa.h>
#include <WiFi.h>
#include <BLEDevice.h>
#include <BLEServer.h>
#include <HTTPClient.h>
#include <BLE2902.h>
#include <ArduinoJson.h>
#include "FS.h"
#include "SD.h"

SPIClass hspi(HSPI);

BLECharacteristic *wifiChar;
BLECharacteristic *statusChar;

String newSSID, newPassword;
String property_id;

const char* SERVICE_UUID = "12345678-1234-5678-1234-56789abcdef0";
const char* WIFI_CHAR_UUID = "abcd1234-5678-1234-5678-abcdef123456";
const char* STATUS_CHAR_UUID = "abcd5678-5678-1234-5678-abcdef654321";

#define LORA_CS_PIN   26
#define LORA_RST_PIN  27
#define LORA_IRQ_PIN  33

#define SD_CS_PIN   15

float lat;
float lon;
int rssi = 0;
String espMacAddress;
String propertyId;

enum PacketType : uint8_t {
  UPDATE_LOCATION = 0,
  ACTIVATE_COLLAR = 1
};

#pragma pack(push, 1)
struct DataPackage {
  float latitude;
  float longitude;
  uint8_t battery;
  uint8_t mac[6];
  uint8_t type;
};
#pragma pack(pop)

DataPackage packageReceived;

bool wifiDadosRecebidos = false;
bool blePermanentlyDisabled = false;

String macBytesToString(uint8_t* mac) {
  String result = "";
  for (int i = 0; i < 6; i++) {
    // Adiciona um '0' à esquerda se o byte for menor que 16
    // (ex: 0F em vez de F)
    if (mac[i] < 0x10) { 
      result += "0";
    }
    // Converte o byte para HEX e o adiciona à String
    result += String(mac[i], HEX); 
  }
  return result; // Retorna a String (ex: "AABBCC112233")
}

// ========================================
// Função que envia dados para o servidor
// ========================================
void saveLocation() {
  String json = "{\"latitude\":" + String(lat, 6) +
                ",\"longitude\":" + String(lon, 6) +
                ",\"rssi\":" + String(rssi) + "}";

  httpPOST("https://tfence.tcorporation.com.br/collar/register", json);
}

void updateLocation() {
  
  StaticJsonDocument<256> doc;
  String macString = macBytesToString(packageReceived.mac);

  doc["mac"] = macString;
  doc["location"]["latitude"] = packageReceived.latitude;
  doc["location"]["longitude"] = packageReceived.longitude;
  doc["battery"] = packageReceived.battery;
  doc["rssi"] = rssi;

  String jsonOutput;
  serializeJson(doc, jsonOutput);

  Serial.println("Enviando JSON para o servidor:");
  Serial.println(jsonOutput);

  httpPOST("https://tfence.tcorporation.com.br/collar/updateLocation", jsonOutput);
}

void activeCollar() {
  StaticJsonDocument<256> doc;
  String macString = macBytesToString(packageReceived.mac);

  doc["mac"] = macString;

  String jsonOutput;
  serializeJson(doc, jsonOutput);

  Serial.println("Enviando JSON para o servidor:");
  Serial.println(jsonOutput);

  httpPOST("https://tfence.tcorporation.com.br/collar/activeCollar", jsonOutput);
}

void registerCentral() {
  String json = "{\"mac_id\":\"" + espMacAddress + "\"" +
                ",\"property_id\":\"" + propertyId + "\"" +
                ",\"status\":\"active\"}";                  

  Serial.println("Enviando JSON: " + json); // Bom para debug
  httpPOST("https://tfence.tcorporation.com.br/central/register", json);
}

// =======================
// Função de Conexào e desconexão
// =======================
class MyServerCallbacks : public BLEServerCallbacks {
    void onDisconnect(BLEServer* pServer) {
      Serial.println("Cliente desconectado.");
      
      if (!blePermanentlyDisabled) {
        Serial.println("Reiniciando advertising...");
        BLEDevice::startAdvertising();
      }
    }
};

// =======================
// Função de conexão Wi-Fi
// =======================
void connectToWiFi() {
  Serial.println("Conectando ao Wi-Fi...");
  WiFi.disconnect(true);
  WiFi.begin(newSSID.c_str(), newPassword.c_str());

  int tentativas = 0;
  while (WiFi.status() != WL_CONNECTED && tentativas < 10) {
    delay(500);
    Serial.print(".");
    tentativas++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWi-Fi conectado!");
    Serial.print("IP: "); Serial.println(WiFi.localIP());
    if (statusChar){
      statusChar->setValue("OK: Wi-Fi conectado!");
      statusChar->notify();
      //Endereço MAC
      espMacAddress = WiFi.macAddress();
      Serial.print("Endereço MAC do ESP32: ");
      Serial.println(espMacAddress);
      registerCentral();
      delay(300);
    } 
    // Desliga o BLE para economizar energia
    Serial.println("Desativando BLE...");
    BLEDevice::stopAdvertising();// Para de anunciar
    BLEDevice::deinit(); // Desativa o BLE completamente

    wifiChar = nullptr;
    statusChar = nullptr;

    blePermanentlyDisabled = true;
  } else {
    Serial.println("\nFalha ao conectar ao Wi-Fi!");
    if (statusChar){
      statusChar->setValue("ERRO: Falha no Wi-Fi!");
      statusChar->notify();
    } 
  }
}

// ========================================
// Callback BLE para receber SSID e senha
// ========================================
class WiFiCallback : public BLECharacteristicCallbacks {
  void onWrite(BLECharacteristic *pChar) {
    String value = pChar->getValue();
    if (value.length() > 0) {
      int sep1 = value.indexOf(';');
      int sep2 = value.indexOf(';', sep1 + 1);

      newSSID = value.substring(0, sep1);
      newPassword = value.substring(sep1 + 1, sep2);
      property_id = value.substring(sep2 + 1);
      propertyId = value.substring(sep2 + 1);

      Serial.println("Property_id recebido: " + property_id);
      Serial.println("SSID recebido: " + newSSID);
      Serial.println("Senha recebida: " + newPassword);

      wifiDadosRecebidos = true;
    }
  }
};

// ========================================
// Função HTTP POST
// ========================================
String httpPOST(String url, String json) {
  HTTPClient http;
  http.begin(url);
  http.addHeader("Content-Type", "application/json");

  int httpCode = http.POST(json);
  String payload = "";

  if (httpCode > 0) {
    payload = http.getString();
    Serial.println("Resposta: " + payload);

    if (statusChar)
      statusChar->setValue("OK: Dados enviados!");
  } else {
    Serial.println("Erro na requisição: " + String(httpCode));

    if (statusChar)
      statusChar->setValue("ERRO: HTTP " + String(httpCode));
  }
  http.end();
  return payload;
}

// Salva as credenciais recebidas no SD card
void saveWiFiToSD(String ssid, String pass, String propId) {
  // Apaga o arquivo antigo, se existir, para garantir que só temos 1 credencial
  if (SD.exists("/wifi.txt")) {
    SD.remove("/wifi.txt");
  }

  File file = SD.open("/wifi.txt", FILE_WRITE);
  if (!file) {
    Serial.println("Erro ao abrir /wifi.txt para escrita!");
    return;
  }
  
  // Salva no formato "ssid;password;property_id"
  file.print(ssid + ";" + pass + ";" + propId);
  file.close();
  Serial.println("Credenciais Wi-Fi salvas no Cartão SD.");
}

bool loadWiFiFromSD() {
  File file = SD.open("/wifi.txt", FILE_READ);
  if (!file) {
    Serial.println("Arquivo /wifi.txt não encontrado.");
    return false;
  }

  if (file.available()) {
    String line = file.readStringUntil('\n'); // Lê a linha inteira
    line.trim(); // Remove espaços em branco ou quebras de linha
    file.close();

    // Extrai os dados do arquivo
    int sep1 = line.indexOf(';');
    int sep2 = line.indexOf(';', sep1 + 1);

    if (sep1 > 0 && sep2 > sep1) {
      newSSID = line.substring(0, sep1);
      newPassword = line.substring(sep1 + 1, sep2);
      property_id = line.substring(sep2 + 1);
      propertyId = property_id; // Sincroniza as duas variáveis

      Serial.println("Credenciais Wi-Fi carregadas do SD Card.");
      return true;
    }
  }
  
  file.close();
  Serial.println("Arquivo /wifi.txt está vazio ou corrompido.");
  return false;
}

// ========================================
// SETUP
// ========================================
void setup() {
  Serial.begin(115200);
  delay(2000);
  Serial.println("Central Iniciada");

// --- CONFIGURAÇÃO PINO CS DO LORA (em VSPI) ---
  pinMode(LORA_CS_PIN, OUTPUT); // pino 26
  digitalWrite(LORA_CS_PIN, HIGH);
  
  // --- CONFIGURAÇÃO PINO CS DO SD (em HSPI) ---
  pinMode(SD_CS_PIN, OUTPUT); // pino 15
  digitalWrite(SD_CS_PIN, HIGH);

  
  // --- INICIALIZAÇÃO DO HSPI (Para o SD Card) ---
  Serial.println("Inicializando barramento HSPI...");
  // (SCK=14, MISO=12, MOSI=13, CS=15)
  hspi.begin(14, 32, 13, SD_CS_PIN);

  // Inicializa o SD Card no HSPI
  Serial.println("Inicializando Cartão SD no HSPI...");
  // Diz ao SD.h para usar o pino CS 15 NO barramento hspi
  if (!SD.begin(SD_CS_PIN, hspi)) { 
    Serial.println("Falha ao inicializar o cartão SD! BLE será iniciado.");
  } else {
    Serial.println("Cartão SD inicializado com sucesso.");
    
    // Tenta carregar credenciais do SD
    if (loadWiFiFromSD()) {
      connectToWiFi(); 
    } else {
      Serial.println("Credenciais não encontradas no SD. Iniciando BLE...");
    }
  }
  // Desativa o SD Card
  digitalWrite(SD_CS_PIN, HIGH);


  // Inicialização do LoRa
  LoRa.setPins(LORA_CS_PIN, LORA_RST_PIN, LORA_IRQ_PIN);
  if (!LoRa.begin(433E6)) {
    Serial.println("Erro ao iniciar LoRa!");
    while (1);
  }
  Serial.println("LoRa iniciado com sucesso.");
  digitalWrite(LORA_CS_PIN, HIGH);

  // Inicialização do BLE
  if (!blePermanentlyDisabled) {
  BLEDevice::init("ESP32-Central");
  BLEServer *pServer = BLEDevice::createServer();

  pServer->setCallbacks(new MyServerCallbacks());

  BLEService *pService = pServer->createService(SERVICE_UUID);

  // Characteristic para receber SSID e senha
  wifiChar = pService->createCharacteristic(
    WIFI_CHAR_UUID,
    BLECharacteristic::PROPERTY_WRITE
  );
  wifiChar->setCallbacks(new WiFiCallback());

  // Characteristic para status (notificação)
  statusChar = pService->createCharacteristic(
    STATUS_CHAR_UUID,
    BLECharacteristic::PROPERTY_READ | BLECharacteristic::PROPERTY_NOTIFY
  );
  statusChar->addDescriptor(new BLE2902());

  pService->start();

  // Começa a anunciar
  BLEAdvertising *pAdvertising = BLEDevice::getAdvertising();
  pAdvertising->addServiceUUID(SERVICE_UUID);
  pAdvertising->setScanResponse(true);
  pAdvertising->setMinPreferred(0x06);  
  pAdvertising->setMinPreferred(0x12);
  BLEDevice::startAdvertising();

  Serial.println("BLE Advertising iniciado!");
  }else{
    Serial.println("Conectado ao WiFi (via SD) no boot. BLE não será iniciado.");
  }
}

// ========================================
// LOOP
// ========================================
void loop() {
  if (wifiDadosRecebidos) {
    wifiDadosRecebidos = false;

    Serial.println("Salvando credenciais recebidas no SD Card...");
    saveWiFiToSD(newSSID, newPassword, propertyId); 

    connectToWiFi();
  }

  // Recebe pacotes LoRa
  int packetSize = LoRa.parsePacket();
  if (packetSize) {
    if(packetSize == sizeof(packageReceived)){
      
      LoRa.readBytes((byte*)&packageReceived, packetSize);
      rssi = LoRa.packetRssi(); 
      String macString = macBytesToString(packageReceived.mac); 

      // IMPRIMA o log completo
      Serial.println(); // Linha em branco para separar
      Serial.println("======= PACOTE LORA RECEBIDO =======");
      Serial.println("  MAC: " + macString);
      Serial.println("  Tipo: " + String(packageReceived.type));
      Serial.println("  Latitude: " + String(packageReceived.latitude, 6));
      Serial.println("  Longitude: " + String(packageReceived.longitude, 6));
      Serial.println("  Bateria: " + String(packageReceived.battery) + "%");
      Serial.println("  RSSI: " + String(rssi) + " dBm");
      Serial.println("====================================");
 
      if(packageReceived.type == PacketType::UPDATE_LOCATION){
        rssi = LoRa.packetRssi();
        Serial.print("Recebido Lat: ");
        Serial.println(packageReceived.latitude, 6);
        Serial.print("Recebido Lng: ");
        Serial.println(packageReceived.longitude, 6);
        updateLocation();
      }else{
        activeCollar();
      }

      }else{
        Serial.print("Erro: Pacote com tamanho incorreto! ");
        Serial.println(packetSize);
        while(LoRa.available()) {
        LoRa.read();
      }
    }
  }
}
