// Coleira Transmissora
#include <Arduino.h>
#include <TinyGPS++.h>
#include <SPI.h>
#include <LoRa.h>
#include <WiFi.h>

// --- Configuração do Deep Sleep ---
#define uS_TO_S_FACTOR 1000000  // Fator de conversão microsegundos para segundos
#define TIME_TO_SLEEP_S 120    // 2 minutos
const unsigned long GPS_TIMEOUT_MS = 600000; // 10 minutos Define por quantos segundos o sistema vai procurar a localização antes de dormir.

//LoRa Pinos
#define LORA_CS_PIN   26
#define LORA_RST_PIN  27
#define LORA_IRQ_PIN  33

//GPS Pinos
#define RX_PIN 16
#define TX_PIN 17

TinyGPSPlus gps;
HardwareSerial gpsSerial(2);

// --- Variáveis Salvas na Memória RTC ---

// Usado para enviar o pacote de ativação apenas na primeira vez
RTC_DATA_ATTR int bootCount = 0; 
RTC_DATA_ATTR float lastGoodLat = 0;
RTC_DATA_ATTR float lastGoodLon = 0;

int marcador = 0;
int counter = 0;
unsigned long lastSendTime = 0; 
const unsigned long sendInterval = 5000; // Intervalo de 5 segundos (5000 ms)

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

DataPackage package;

void activeCollar(){
  package.type = PacketType::ACTIVATE_COLLAR;
  LoRa.beginPacket();
  LoRa.write((byte*)&package, sizeof(package));
  LoRa.endPacket();
}

void sendPackage(float lat, float lon, uint8_t bat){
  //Prepara os dados
  package.latitude = lat;   // <-- CORRIGIDO
  package.longitude = lon;  // <-- CORRIGIDO
  package.battery = bat;
  package.type = PacketType::UPDATE_LOCATION;

  // Envia os dados
  LoRa.beginPacket();
  LoRa.write((byte*)&package, sizeof(package));
  LoRa.endPacket();
}

void prepararPacoteTeste(){
  // Coloca dados FALSOS (hardcoded) na struct
  package.latitude = -23.5505;  // Localização Fictícia (São Paulo)
  package.longitude = -46.6333; // Localização Fictícia (São Paulo)
  package.battery = 87;         // Bateria Fictícia
  package.type = PacketType::UPDATE_LOCATION;
}

void displayInfo() {
  Serial.print("Localização: ");
  if (gps.location.isValid()) {
    Serial.print(gps.location.lat(), 6); // Latitude
    Serial.print(", ");
    Serial.print(gps.location.lng(), 6); // Longitude
  } else {
    Serial.print("INVÁLIDA");
  }

  Serial.print(" | Data: ");
  if (gps.date.isValid()) {
    Serial.print(gps.date.day());
    Serial.print("/");
    Serial.print(gps.date.month());
    Serial.print("/");
    Serial.print(gps.date.year());
  } else {
    Serial.print("INVÁLIDA");
  }

  Serial.print(" | Hora (UTC): ");
  if (gps.time.isValid()) {
    if (gps.time.hour() < 10) Serial.print(F("0"));
    Serial.print(gps.time.hour());
    Serial.print(":");
    if (gps.time.minute() < 10) Serial.print(F("0"));
    Serial.print(gps.time.minute());
    Serial.print(":");
    if (gps.time.second() < 10) Serial.print(F("0"));
    Serial.print(gps.time.second());
  } else {
    Serial.print("INVÁLIDA");
  }
  
  Serial.print(" | Satélites: ");
  if (gps.satellites.isValid()){
    Serial.print(gps.satellites.value());
  } else {
    Serial.print("INVÁLIDO");
  }

  Serial.println(); // Pula para a próxima linha
}

void setup() {
  Serial.begin(115200);
  delay(2000);
  Serial.println("\n=======================");
  Serial.println("Coleira ACORDOU!");
  Serial.print("Contagem de Boot: ");
  Serial.println(bootCount); // Imprime o valor salvo

  // Ativa modulo Wifi, guarda a endereço MAC, e desliga o modulo Wifi
    WiFi.mode(WIFI_STA);
    delay(100);
    WiFi.macAddress(package.mac);
    WiFi.mode(WIFI_OFF);
    Serial.print("MAC desta Coleira: ");
    for (int i = 0; i < 6; i++) {
      if (package.mac[i] < 0x10) Serial.print("0");
      Serial.print(package.mac[i], HEX);
      if (i < 5) Serial.print(":");
    }
    Serial.println();
    delay(100);

  // Inicialização do módulo LoRa
    LoRa.setPins(LORA_CS_PIN, LORA_RST_PIN, LORA_IRQ_PIN);
    if (!LoRa.begin(433E6)) {
      Serial.println("Erro ao iniciar LoRa.");
    while (1);
    }
    Serial.println("LoRa iniciado com sucesso!");
    delay(1000);

  // LÓGICA DE ATIVAÇÃO (USANDO MEMÓRIA RTC)
    if (bootCount == 0) {
      Serial.println("Primeiro boot! Enviando pacote de ATIVAÇÃO...");
      activeCollar();
      delay(200);
      bootCount = 1; // Incrementa para que isso não rode mais
    }

  // Inicialização do módulo GPS
    Serial.println("Inicializando teste do GPS NEO-M8N");
    gpsSerial.begin(9600, SERIAL_8N1, RX_PIN, TX_PIN);

  // ESPERA PELO SINAL COM TIMEOUT
    Serial.println("Procurando sinal GPS (Timeout de 90s)...");

    unsigned long startTime = millis();
    bool gpsFixEncontrado = false;

    // --- Timer para o Log ---
    unsigned long lastLogTime = 0;
    const unsigned long logInterval = 5000;
    //Loop de busca do GPS agora é mais rápido
    while (millis() - startTime < GPS_TIMEOUT_MS) {
      while (gpsSerial.available() > 0) {
          gps.encode(gpsSerial.read());
      }
      
      // Verifica se encontrou um "fix"
      if (gps.location.isValid() && gps.satellites.value() >= 3) {
          gpsFixEncontrado = true;
          break; 
      }

      // Logs de GPS
      if (millis() - lastLogTime > logInterval) {
          lastLogTime = millis();
          Serial.print("Verificando... ");
          displayInfo();
      }
      
      delay(10);
    }

    // Prepara e Envia o pacote
    if (gpsFixEncontrado) {
      Serial.println("\nSinal GPS ENCONTRADO!");
      sendPackage(gps.location.lat(), gps.location.lng(), 99); //Bateria Ficticia
      Serial.println("Pacote de LOCALIZAÇÃO enviado!");
      
      // SALVA a localização boa na Memória RTC
      lastGoodLat = gps.location.lat();
      lastGoodLon = gps.location.lng();
      
    } else {
      Serial.println("\nTIMEOUT! Sinal GPS não encontrado.");
      
      // Se falhar, prepara um pacote com a ultima localização salva no RTC
      sendPackage(lastGoodLat, lastGoodLon, 98); 
      Serial.println("Enviado ÚLTIMA localização boa conhecida.");
    }

    // Entra em Deep Sleep
    Serial.println("Entrando em deep-sleep por 2 minutos...");
    delay(100); 
    
    esp_sleep_enable_timer_wakeup(TIME_TO_SLEEP_S * uS_TO_S_FACTOR);
    esp_deep_sleep_start();
}

void loop() {
 delay(1000);
}
