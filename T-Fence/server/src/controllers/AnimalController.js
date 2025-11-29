require('dotenv').config();

const Animal = require("../models/Animal");
const Collar = require("../models/Collar");

const AnimalController = {
  async registerAnimal(req, res) {
    console.log("Chegou ao Banckend")
    try {
      const { property_id, name, identifier } = req.body;

      const animal = await Animal.create({
        property_id,
        name,
        identifier
      });

      res.status(201).json(animal);
    } catch (err) {
      res.status(400).json({ error: "Erro ao cadastrar animal ==> " + err.message });
    }
  },

  async delete(req, res) {
    try {
      const { animal_id } = req.body;
      console.log(animal_id)
      const deleted = await Animal.findByIdAndDelete(animal_id);

      if (!deleted) {
        return res.status(404).json({ error: "Animal não encontrada" });
      }

      res.status(200).json({ message: "Animal deletado com sucesso" });
    } catch (err) {
      res.status(400).json({ error: "Erro ao deletar Animal" });
    }
  },

  async updateInfo(req, res) {
    try {
      const { _id, name, identifier } = req.body;

      const animal = await Animal.findByIdAndUpdate(
        _id,
        {
          name,
          identifier,
        },
        { new: true }
      );

      res.status(200).json(animal);
    } catch (err) {
      res.status(400).json({ error: "Erro ao atualizar Animal" });
    }
  },

  async findAnimals(req, res) {
    try {
      const { property_id } = req.body;
      const animals = await Animal.find({ property_id });

      const animalIds = animals.map(a => a._id);
      const collars = await Collar.find({ animal_id: { $in: animalIds } }).populate("fence_id", "name");

      const result = animals.map(animal => ({
        ...animal.toObject(),
        collar: collars.find(c => c.animal_id.toString() === animal._id.toString()) || null
      }));

      res.status(200).json(result);
    } catch (err) {
      res.status(400).json({ error: "Erro ao pesquisar animais ==> " + err.message });
    }
  },

  async findAnimalsNoCollars(req, res) {
    try {
      const { property_id } = req.body;
      const animals = await Animal.find({ property_id });
      const collars = await Collar.find({ animal_id: { $in: animals.map(a => a._id) } });

      const animalsWithoutCollar = animals.filter(animal => {
        return !collars.some(c => c.animal_id.toString() === animal._id.toString());
      });

      res.status(200).json(animalsWithoutCollar);
    } catch (err) {
      res.status(400).json({ error: "Erro ao pesquisar animais sem coleira ==> " + err.message });
    }
  },

  async getAnimalById(req, res) {
    try {
      const { animal_id } = req.body;
      const animal = await Animal.findById(animal_id);
      const collar = await Collar.findOne({ animal_id }).populate("fence_id", "name");
      res.status(200).json({ animal, collar });
    } catch (err) {
      res.status(500).json({ error: "Erro ao buscar animais" });
    }
  },

  async searchCollarByName(req, res) {
    try {
      const { property_id, name_animal } = req.body;
      const animais = await Animal.find({
        property_id,
        name: { $regex: name_animal, $options: "i" }
      });
      res.json(animais);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar animais" });
    }
  },

};

module.exports = { AnimalController };
