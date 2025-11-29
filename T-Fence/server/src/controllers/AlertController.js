require('dotenv').config();

const Alert = require("../models/Alert");

const AlertController = {

  async findAlerts(req, res) {
    try {
      const { property_id } = req.body;
      const alerts = await Alert.find({ property_id });

      res.status(201).json(alerts);
    } catch (err) {
      res.status(400).json({ error: "Erro ao pesquisar animais sem coleira ==> " + err.message });
    }
  },

};

module.exports = { AlertController };
