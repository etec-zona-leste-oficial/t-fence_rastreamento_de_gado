require('dotenv').config();
const Central = require("../models/Central");

const CentralController = {
  async register(req, res) {
    try {
      const { mac_id, property_id, status } = req.body;
      const central = await Central.create({ mac_id, property_id, status });
      res.status(201).json(central);
    } catch (err) {
      res.status(400).json({ error: "Erro ao cadastrar Central" });
    }
  },

    async verifyCentralPair(req, res) {
    try {
      const { property_id } = req.body;
      const central = await Central.findOne({ property_id });

      if (!central) {
        return res.status(401).json({ error: "Central ainda não emparelhada" });
      }
      res.json({ message: "Central já emparelhada", central });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

    async getAll(req, res) {
    try {
      const central = await Central.find(); // busca todos
      res.json(central);
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar Centrais" });
    }
  },

};

module.exports = { CentralController };
