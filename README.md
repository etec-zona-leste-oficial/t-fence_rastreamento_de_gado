<div align="center">
  <img src="https://github.com/user-attachments/assets/8a87e8d9-4fc9-4fc6-9293-5c30cf93ae38" alt="Logo do Projeto T-Fence" width="350px">
</div>

# T-Fence: Sistema de Monitoramento Inteligente para Gado 🐄

> Plataforma que utiliza **dispositivos IoT**, **comunicação LoRa** e **Geofencing** para o monitoramento eficiente de gado em áreas rurais. O sistema visa auxiliar produtores a prevenir furtos e perdas, aumentando o controle e a segurança do rebanho.

---

## 💡 Visão Geral & Contexto

A **T-Fence** é um Trabalho de Conclusão de Curso (**TCC**) desenvolvido como resposta direta aos desafios da **pobre infraestrutura rural** e das **grandes extensões territoriais**, que dificultam o monitoramento de animais.

A solução é composta por dois dispositivos IoT (coleira e central) e um aplicativo móvel. A proposta é **energeticamente autônoma**, utilizando **energia fotovoltaica**, e garante **comunicação de longo alcance via LoRa**, operando sem depender de sinal de internet ou energia elétrica local.

---

## ✨ Funcionalidades em Destaque

* **Geolocalização:** Monitora a localização do gado via GPS e transmite a posição usando LoRa.
* **Cerca Virtual (Geofence):** Permite desenhar um perímetro no mapa e gera alertas automáticos se o animal sair da área definida.
* **Monitoramento de Status:** Verifica a porcentagem de bateria do dispositivo e informa no aplicativo.
* **Sistema de Alertas 🚨:** Notificações críticas enviadas em caso de:
    * Fuga do animal (saída do Geofence).
    * Bateria baixa (abaixo de 20%).
    * Perda de sinal de comunicação (por 10 minutos).
    * Violação ou remoção da coleira.
* **Interface Mobile:** Aplicação em React Native para gestão e visualização prática do rebanho.

---

## 📸 Visual do Projeto: Hardware & Software

### Coleira IoT (Dispositivo T-Fence)
A modelagem 3D da coleira foi desenhada para acomodar o hardware (ESP32, GPS, LoRa, bateria) e garantir o conforto do animal.
<div align="center">
  <img src="https://github.com/user-attachments/assets/0daab91f-ea30-4d10-923a-87cf5b91f62c" alt="Modelo 3D da Coleira T-Fence" width="300px"/>
  <img src="https://github.com/user-attachments/assets/c941ec82-a43f-4605-aad8-38f14b7946a7" alt="Modelo 3D da Coleira T-Fence" width="300px"/>
  <p><strong>Protótipo Final da Coleira</strong></p>
</div>

### Central IoT
Dispositivo para transmitir as informações da coleira até a base de dados, utilizando uma antena para longo alcance.
<div align="center">
  <img src="https://github.com/user-attachments/assets/07390b89-54f2-42be-86f3-ac16ded01832" alt="Modelo 3D da Central T-Fence" width="300px"/>
  <img src="https://github.com/user-attachments/assets/b6904cce-1332-4025-be0c-5de1b913dd31" alt="Modelo 3D da Central T-Fence" width="300px"/>
  <p><strong>Modelo 3D da Central de Comunicação</strong></p>
</div>

### Aplicativo Mobile
O aplicativo atua como a interface do produtor, transformando coordenadas e status da coleira em informações visuais e acionáveis.
<div align="center">
  <img src="https://github.com/user-attachments/assets/87ce0c7f-f467-4d1a-a732-94f86e335225" alt="Telas do Aplicativo T-Fence: Monitoramento e Cercas" width="500px"/>
  <p><strong>Telas do Aplicativo: Monitoramento em Mapa e Gestão de Cercas</strong></p>
</div>

---

## 🛠️ Stack Tecnológica

### 1. Hardware & IoT
| Tecnologia | Função no T-Fence |
| :--- | :--- |
| ![ESP32](https://img.shields.io/badge/ESP32-86B18A?style=for-the-badge&logoColor=white) | **Microcontrolador** principal dos dispositivos. |
| ![LoRa](https://img.shields.io/badge/LoRa-86B18A?style=for-the-badge&logoColor=white) | **Comunicação de Longo Alcance** e baixo consumo entre coleira e central. |
| ![GPS](https://img.shields.io/badge/GPS-86B18A?style=for-the-badge&logoColor=white) | Módulo para **Captura de Localização** precisa. |
| ![Painel Solar](https://img.shields.io/badge/Energia%20Fotovoltaica-86B18A?style=for-the-badge&logoColor=white) | Garante a **Autonomia Energética** do equipamento. |

### 2. Software & Backend
| Tecnologia | Função no T-Fence |
| :--- | :--- |
| ![NodeJS](https://img.shields.io/badge/Node.js-86B18A?style=for-the-badge&logo=node.js&logoColor=white) | Ambiente de execução para o **Backend** da aplicação. |
| ![MongoDB](https://img.shields.io/badge/MongoDB-86B18A?style=for-the-badge&logo=mongodb&logoColor=white) | **Banco de Dados** não relacional (NoSQL) para gestão dos dados. |
| ![React Native](https://img.shields.io/badge/React%20Native-86B18A?style=for-the-badge&logo=react&logoColor=white) | **Desenvolvimento Mobile** multiplataforma (iOS/Android). |
| ![Google Maps API](https://img.shields.io/badge/Google%20Maps%20API-86B18A?style=for-the-badge&logo=googlemaps&logoColor=white) | Utilizada para renderizar **Mapas** e Geofences no app. |

---

## 👥 Equipe e Instituição

<div align="center">
  <img src="https://github.com/user-attachments/assets/062eb7b2-7b2d-4505-9841-fca657016efc" width="900px" alt="Foto da Equipe T-Fence" />
  <br><br>
  <a href="https://github.com/Jonatasfrinhai"><b>Jônatas Frinhani de Souza Palmieri</b></a>&nbsp; • &nbsp;
  <a href="https://github.com/vinium12"><b>Vinicius Fernandes de Lima</b></a> &nbsp; • &nbsp;
  <a href="https://github.com/ViniciusO6"><b>Vinicius Augusto Rodrigues da Silva</b></a>
</div>

<br>

### Instituição
Este projeto foi elaborado como **Trabalho de Conclusão de Curso (TCC)** do curso de **Mtec em Desenvolvimento de Sistemas** da **Etec da Zona Leste** (São Paulo).

<br>

---

<div align="center">
  <img src="https://github.com/user-attachments/assets/8a87e8d9-4fc9-4fc6-9293-5c30cf93ae38" alt="Logo do Projeto T-Fence" width="205px">
</div>

<div align="center">
  <h2>© T-Fence: Monitoramento de Animais em Áreas Rurais, 2025</h2>
  <h6>São Paulo, Brasil</h6>
</div>
