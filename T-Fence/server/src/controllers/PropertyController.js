require('dotenv').config();

const Property = require("../models/Property");

function generatePropertyCode() {
  return Math.random().toString(36).substring(2, 7).toUpperCase();
}

const PropertyController = {
  async registerProperty(req, res) {
    try {
      const { user_id, name_Property, state, city, address, area, location, description } = req.body;

      const property = await Property.create({
        user_id,
        name_Property,
        state,
        city,
        address,
        area,
        location,
        description,
        propertyCode: generatePropertyCode()
      });

      res.status(201).json(property);
    } catch (err) {
      res.status(400).json({ error: "Erro ao cadastrar Propriedade ==> " + err.message });
    }
  },

  async findProperty(req, res) {
    try {
      const { user_id } = req.body;
      const property = await Property.findOne({ user_id });

      res.status(201).json(property);
    } catch (err) {
      res.status(400).json({ error: "Erro ao cadastrar Propriedade ==> " + err.message });
    }
  },

  async findUserByPropertyId(req, res) {
    try {
      const { property_id } = req.body;
      const user = await Property.findOne({ _id: property_id }).populate("user_id", "notification_token");

      res.status(201).json(user);
    } catch (err) {
      res.status(400).json({ error: "Erro ao cadastrar Propriedade ==> " + err.message });
    }
  },

  async findCollaborator(req, res) {
    try {
      const { user_id } = req.body;

      const property = await Property.findOne({
        $or: [
          { user_id: user_id },
          { "collaborators.user_id": user_id }
        ]
      });

      if (!property) {
        return res.status(404).json({
          exists: false,
          property: null
        });
      }

      res.status(200).json({
        exists: true,
        property
      });

    } catch (err) {
      res.status(500).json({
        error: "Erro ao buscar propriedade do usuário ⇒ " + err.message
      });
    }
  },

  async fetchRequestCollaborators(req, res) {
    try {
      const { property_id } = req.body;

      const property = await Property.findOne({ _id: property_id })
        .populate("collaboratorRequests.user_id", "firstName surname email");

      if (!property) {
        return res.status(404).json({ error: "Propriedade não encontrada" });
      }

      return res.json({
        message: "Propriedade encontrada",
        collaboratorRequests: property.collaboratorRequests,
        property
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

  async requestCollaborators(req, res) {
    try {
      const { propertyCode, user_id } = req.body;

      if (!propertyCode || !user_id) {
        return res.status(400).json({ error: "Código e usuário são obrigatórios." });
      }

      const code = propertyCode.toUpperCase();

      const property = await Property.findOne({ propertyCode: code });

      if (!property) {
        return res.status(404).json({ error: "Código inválido. Propriedade não encontrada." });
      }

      const isAlreadyRequested = property.collaboratorRequests.some(
        r => r.user_id.toString() === user_id
      );

      if (isAlreadyRequested) {
        return res.status(400).json({ error: "Você já enviou uma solicitação para esta propriedade." });
      }

      // Salvar solicitação
      property.collaboratorRequests.push({
        user_id,
        requestedAt: new Date()
      });

      await property.save();

      res.status(201).json({
        message: "Solicitação enviada com sucesso!",
        propertyName: property.name_Property,
        propertyId: property._id
      });


    } catch (err) {
      res.status(400).json({
        error: "Erro ao solicitar colaboração ==> " + err.message
      });
    }
  },

async approveCollaborator(req, res) {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "user_id é obrigatório." });
    }

    const property = await Property.findOne({
      "collaboratorRequests.user_id": user_id
    });

    if (!property) {
      return res.status(404).json({ error: "Nenhuma solicitação encontrada para esse usuário." });
    }

    const request = property.collaboratorRequests.find(
      (req) => req.user_id.toString() === user_id
    );

    if (!request) {
      return res.status(404).json({ error: "Solicitação não encontrada." });
    }

    property.collaborators.push({
      user_id,
      addedAt: new Date()
    });

    property.collaboratorRequests = property.collaboratorRequests.filter(
      (r) => r.user_id.toString() !== user_id
    );

    await property.save();

    res.json({
      message: "Colaborador aprovado com sucesso!",
      collaborators: property.collaborators,
      propertyId: property._id
    });

  } catch (err) {
    res.status(500).json({
      error: "Erro ao aprovar colaborador: " + err.message
    });
  }
},

  async removeRequestCollaborator(req, res) {
    try {
      const { user_id } = req.body;

      if (!user_id) {
        return res.status(400).json({ error: "user_id é obrigatório." });
      }

      const property = await Property.findOne({
        "collaboratorRequests.user_id": user_id
      });

      if (!property) {
        return res.status(404).json({
          error: "Nenhuma solicitação encontrada para este usuário."
        });
      }

      property.collaboratorRequests = property.collaboratorRequests.filter(
        r => r.user_id.toString() !== user_id
      );

      await property.save();

      res.json({
        message: "Solicitação removida com sucesso!",
        propertyId: property._id,
        collaboratorRequests: property.collaboratorRequests
      });

    } catch (err) {
      res.status(500).json({
        error: "Erro ao remover solicitação: " + err.message
      });
    }
  },

  async removeCollaborator(req, res) {
    try {
      const { user_id } = req.body;

      if (!user_id) {
        return res.status(400).json({ error: "user_id é obrigatório." });
      }

      const property = await Property.findOne({
        "collaborators.user_id": user_id
      });

      if (!property) {
        return res.status(404).json({
          error: "Nenhum colaborador encontrado."
        });
      }

      property.collaborators = property.collaborators.filter(
        r => r.user_id.toString() !== user_id
      );

      await property.save();

      res.json({
        message: "Colaborador removido com sucesso!",
        propertyId: property._id,
        collaborators: property.collaborators
      });

    } catch (err) {
      res.status(500).json({
        error: "Erro ao remover colaborador: " + err.message
      });
    }
  },


  async updateName(req, res) {
    try {
      const { _id, name_Property } = req.body;
      const property = await Property.findOneAndUpdate(
        { _id: _id },
        {
          name_Property: name_Property
        },
        { new: true }
      );

      res.json({ message: "nome da propriedade alterado com sucesso", property });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor: " + err });
    }
  },

  async updateDescription(req, res) {
    try {
      const { _id, description } = req.body;
      const property = await Property.findOneAndUpdate(
        { _id: _id },
        {
          description: description
        },
        { new: true }
      );

      res.json({ message: "Descrição da propriedade alterado com sucesso", property });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor: " + err });
    }
  },

  async updateArea(req, res) {
    try {
      const { _id, area } = req.body;
      const property = await Property.findOneAndUpdate(
        { _id: _id },
        {
          area: area
        },
        { new: true }
      );

      res.json({ message: "Área da propriedade alterado com sucesso", property });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor: " + err });
    }
  },

  async findPropertyById(req, res) {
    try {
      const { property_id } = req.body;
      const property = await Property.findOne({ _id: property_id });

      if (!property) {
        return res.status(401).json({ error: "Propriedade não encontrado" });
      }

      res.json({ message: "Propriedade encontrado", property });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

  async fetchCollaborates(req, res) {
    try {
      const { property_id } = req.body;

      const property = await Property.findOne({ _id: property_id })
        .populate("collaborators.user_id", "firstName surname email");

      if (!property) {
        return res.status(404).json({ error: "Propriedade não encontrada" });
      }

      return res.json({
        message: "Propriedade encontrada",
        collaborators: property.collaborators,
        property
      });

    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  }

};

module.exports = { PropertyController };
