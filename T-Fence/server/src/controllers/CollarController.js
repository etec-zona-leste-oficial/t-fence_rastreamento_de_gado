require('dotenv').config();

const axios = require('axios');
const geolib = require('geolib');
const Collar = require("../models/Collar");
const Fence = require("../models/Fence");
const Alert = require("../models/Alert");
const User = require("../models/User");
const Property = require("../models/Property");

async function sendPushNotification(pushToken, title, body) {
  // Validação para garantir que não é um token vazio ou um objeto
  if (!pushToken || typeof pushToken !== 'string' || !pushToken.startsWith('ExponentPushToken')) {
    console.warn(`Tentativa de envio para um token inválido: ${pushToken}`);
    return; // Não tenta enviar
  }

  const message = {
    to: pushToken,
    sound: 'default',
    title: title,
    body: body,
    data: { someData: 'aqui vão dados extras' },
    channelId: 'default',
  };

  try {
    await axios.post('https://exp.host/--/api/v2/push/send', message, {
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
    });
    console.log(`Notificação enviada com sucesso para: ${pushToken}`);
  } catch (error) {
    console.error('Erro ao enviar notificação:');
    if (error.response) {
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
}

const CollarController = {
  async register(req, res) {
    try {
      const { mec, name_collar, fence_id, status, property_id, animal_id, location, battery, rssi } = req.body;
      const collar = await Collar.create({ mec, name_collar, fence_id, status, property_id, animal_id, location, battery, rssi });
      res.status(201).json(collar);
    } catch (err) {
      res.status(400).json({ error: "Erro ao cadastrar Coleira" });
    }
  },

  async activeCollar(req, res) {
    try {
      const { mac } = req.body;
      const collar = await Collar.findOneAndUpdate(
        { mec: mac },
        { status: "Active" },
        { new: true }
      );
      res.status(201).json(collar);
    } catch (err) {
      res.status(400).json({ error: "Erro ao associar coleira Coleira" });
    }
  },

  async delete(req, res) {
    try {
      const { collar_id } = req.body;
      console.log(collar_id)
      const deleted = await Collar.findByIdAndDelete(collar_id);


      if (!deleted) {
        return res.status(404).json({ error: "Coleira não encontrada" });
      }

      res.status(200).json({ message: "Coleira deletada com sucesso" });
    } catch (err) {
      res.status(400).json({ error: "Erro ao deletar Coleira" });
    }
  },

  async updateInfo(req, res) {
    try {
      const { collar_id, name_collar, animal_id, fence_id } = req.body;

      const collar = await Collar.findByIdAndUpdate(
        collar_id,
        {
          name_collar,
          animal_id,
          fence_id
        },
        { new: true }
      );

      res.status(200).json(collar);
    } catch (err) {
      res.status(400).json({ error: "Erro ao atualizar informações" });
    }
  },

  async updateLocation(req, res) {
    try {
      const { mac, location, battery, rssi } = req.body;

      const collarId = await Collar.findOne({ mec: mac }).populate("animal_id", "name");
      console.log(collarId);
      const fence = await Fence.findOne({ _id: collarId.fence_id });
      const user = await Property.findOne({_id: collarId.property_id }).populate("user_id", "notification_token");
      const firstCollaboratorId = user.collaborators?.[0]?.user_id;
      const collaborator = await User.findOne({_id: firstCollaboratorId});
      console.log("Info Colaboradores:", collaborator)
      console.log("Info Colaboradores:", collaborator.notification_token)
      console.log("Primeiro colaborador:", firstCollaboratorId);

      const fenceCoords = fence.coordinates.map(coord => ({
        latitude: parseFloat(coord.latitude),
        longitude: parseFloat(coord.longitude),
      }));

      const pontoAtual = {
        latitude: parseFloat(location.latitude),
        longitude: parseFloat(location.longitude),
      };
      
      const insideTheFence = geolib.isPointInPolygon(pontoAtual, fenceCoords);

      if (!insideTheFence) {
        console.log("Fora da Cerca")
        const alert = await Alert.findOne({ collar_id: collarId._id }).sort({ timestamp: -1 });
        console.log(alert);
        if (!alert) {
          console.log("Criou novo Registro")
          const alert = await Alert.create({
            property_id: collarId.property_id,
            name_animal: collarId.animal_id.name,
            name_collar: collarId.name_collar,
            collar_id: collarId._id,
            fence_id: fence._id,
            type: "OUT_OF_BOUNDS",
            message: "O animal saiu do perímetro definido.",
            location,
          });
          await sendPushNotification(user.user_id.notification_token, "ALERTA DE FUGA", `Animal ${collarId.animal_id.name} saiu do perímetro`);
          await sendPushNotification(collaborator.notification_token, "ALERTA DE FUGA", `Animal ${collarId.animal_id.name} saiu do perímetro`);
        } else if (alert.resolved) {
          console.log("Criou novo Registro")
          const alert = await Alert.create({
            property_id: collarId.property_id,
            name_animal: collarId.animal_id.name,
            name_collar: collarId.name_collar,
            collar_id: collarId._id,
            fence_id: fence._id,
            type: "OUT_OF_BOUNDS",
            message: "O animal saiu do perímetro definido.",
            location,
          });
          await sendPushNotification(user.user_id.notification_token, "ALERTA DE FUGA", `Animal ${collarId.animal_id.name} saiu do perímetro`);
          await sendPushNotification(collaborator.notification_token, "ALERTA DE FUGA", `Animal ${collarId.animal_id.name} saiu do perímetro`);
        } else {
          console.log("Ainda nao solucionado")
          const alert = await Alert.findOne({ collar_id: collarId._id }).sort({ timestamp: -1 });
          const alertUpdate = await Alert.findByIdAndUpdate(
            alert._id,
            {
              location: location,
            },
            { new: true }
          );
          await sendPushNotification(user.user_id.notification_token, "ALERTA DE FUGA", `Animal ${collarId.animal_id.name} saiu do perímetro`);
          await sendPushNotification(collaborator.notification_token, "ALERTA DE FUGA", `Animal ${collarId.animal_id.name} saiu do perímetro`);
        }

      } else {
        console.log("Está dentro da Cerca")
        const alert = await Alert.findOne({ collar_id: collarId._id }).sort({ timestamp: -1 });
        if (alert) {
          const alertUpdate = await Alert.findByIdAndUpdate(
            alert._id,
            {
              resolved: true,
            },
            { new: true }
          );

          const alertReturned = await Alert.create({
            property_id: collarId.property_id,
            name_animal: collarId.animal_id.name,
            name_collar: collarId.name_collar,
            collar_id: collarId._id,
            fence_id: fence._id,
            type: "RETURNED",
            message: "O animal retornou do perímetro definido.",
            location,
            resolved: true,
          });
        }
      }

      const collar = await Collar.findByIdAndUpdate(
        collarId._id,
        {
          $push: { location },
          battery,
          rssi,
        },
        { new: true }
      );

      res.status(200).json({ success: true, insideTheFence, collar });
    } catch (err) {
      res.status(400).json({ error: "Erro ao atualizar Localização: " + err });
    }
  },

  async findCollar(req, res) {
    try {
      const { property_id } = req.body;

      // Busca todas as coleiras e popula o nome da cerca
      const collars = await Collar.find({ property_id }).populate("fence_id", "name");

      // Para cada coleira, busca o último alerta e retorna o campo resolved
      const collarsWithResolved = await Promise.all(
        collars.map(async (collar) => {
          const lastAlert = await Alert.findOne({ collar_id: collar._id })
            .sort({ timestamp: -1 })
            .select("resolved"); // pega só o campo resolved

          return {
            ...collar.toObject(),
            resolved: lastAlert ? lastAlert.resolved : null, // se não tiver alerta ainda
          };
        })
      );

      // Retorna o resultado
      res.status(200).json(collarsWithResolved);

    } catch (err) {
      res.status(400).json({ error: "Erro ao pesquisar coleiras => " + err.message });
    }
  },


  async findCollarById(req, res) {
    try {
      const { collar_id } = req.body;
      const collar = await Collar.findOne({ _id: collar_id });

      res.status(200).json(collar);
    } catch (err) {
      res.status(400).json({ error: "Erro ao pesquisar Coleira ==> " + err.message });
    }
  },

  async searchCollarByName(req, res) {
    try {
      const { property_id, name_collar } = req.body;
      const collars = await Collar.find({
        property_id,
        name_collar: { $regex: name_collar, $options: "i" }
      });
      res.json(collars);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar coleiras" });
    }
  },

  async getAll(req, res) {
    try {
      const collars = await Collar.find(); // busca todos
      res.json(collars);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar Coleira" });
    }
  },

};

module.exports = { CollarController };
