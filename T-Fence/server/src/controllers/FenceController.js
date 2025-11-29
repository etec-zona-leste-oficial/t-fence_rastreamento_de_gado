require('dotenv').config();

const Fence = require("../models/Fence");

const FenceController = {
  async registerFence(req, res) {
    try {
      const { property_id, status, name, coordinates } = req.body;

      const fence = await Fence.create({
        property_id,
        status,
        name,
        coordinates,
      });

      res.status(201).json(fence);
    } catch (err) {
      res.status(400).json({ error: "Erro ao cadastrar Cerca ==> " + err.message });
    }
  },

  async updateFence(req, res) {
    try {
      const { fence_id, name, coordinates } = req.body;
      const fence = await Fence.findOneAndUpdate(
        { _id: fence_id },
        { name: name, coordinates: coordinates },
        { new: true }
      );
      res.status(201).json(fence);
    } catch (err) {
      res.status(400).json({ error: "Erro ao atualizar cerca" });
    }
  },

  async deleteFence(req, res) {
    try {
      const { fence_id } = req.body;
      const deleted = await Fence.findByIdAndDelete(fence_id);

      if (!deleted) {
        return res.status(404).json({ error: "Cerca não encontrada" });
      }
      res.status(200).json({ message: "Cerca deletada com sucesso" });
    } catch (err) {
      res.status(400).json({ error: "Erro ao deletar Cerca" });
    }
  },

  async findFences(req, res) {
    try {
      const { property_id } = req.body;
      const fence = await Fence.find({ property_id });

      res.status(201).json(fence);
    } catch (err) {
      res.status(400).json({ error: "Erro ao pesquisasr cercas ==> " + err.message });
    }
  },

  async findFenceById(req, res) {
    try {
      const { fence_id } = req.body;
      const fence = await Fence.findOne({ _id: fence_id });

      res.status(201).json(fence);
    } catch (err) {
      res.status(400).json({ error: "Erro ao pesquisar cerca ==> " + err.message });
    }
  },

  async searchFenceByName(req, res) {
    try {
      const { property_id, name } = req.body;
      const fences = await Fence.find({
        property_id,
        name: { $regex: name, $options: "i" }
      });
      res.json(fences);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar cercas" });
    }
  },



};

module.exports = { FenceController };
