require('dotenv').config();

const User = require("../models/User");
const Property = require("../models/Property");

const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(params = {}) {
  // process.env.JWT_SECRET deve ser a sua chave que está no arquivo .env
  return jwt.sign(params, process.env.JWT_SECRET, {
    expiresIn: 86400, // Token expira em 24 horas
  });
}

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

const UserController = {
  async register(req, res) {
    try {
      const { email, password, firstName, surname, notification_token, phoneNumber } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        password: hashedPassword, // Salva a senha com hash
        firstName,
        surname,
        notification_token,
        phoneNumber
      });

      user.password = undefined;
      const token = generateToken({ id: user.id });

      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ error: "Erro ao cadastrar usuário ==> " + err.message });
    }
  },

async login(req, res) {
  try {
    const { email, password, notificationToken } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }

    user.password = undefined;

    // PRIMEIRO: tenta achar propriedade onde ele é OWNER
    let property = await Property.findOne({ user_id: user._id });

    // SE NÃO FOR DONO → procura onde ele é COLABORADOR
    if (!property) {
      property = await Property.findOne({
        "collaborators.user_id": user._id
      });
    }

    // Token
    const token = generateToken({ id: user.id });

    // Atualiza token de notificação
    const updateNotificationToken = await User.findOneAndUpdate(
      { email },
      { notification_token: notificationToken },
      { new: true }
    );

    return res.json({
      message: "Login realizado com sucesso",
      user,
      token,
      property, // agora pode ser propriedade como colaborador também
      updateNotificationToken
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro interno no servidor: " + err.message });
  }
},


  async verifyEmailExist(req, res) {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: "Email ainda não cadastrado" });
      }

      res.json({ message: "Email já cadastrado", user });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

  async selectUser(req, res) {
    try {
      const { _id } = req.body;
      const user = await User.findOne({ _id: _id });

      if (!user) {
        return res.status(401).json({ error: "Usuario não encontrado" });
      }

      res.json({ message: "Usuario encontrado", user });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor" });
    }
  },

  async registerNotificationToken(req, res) {
    try {
      const { email, notification_token } = req.body;
      const user = await User.findOneAndUpdate(
        { email: email },
        { notification_token: notification_token },
        { new: true }
      );

      res.json({ message: "Token de notificação cadastrada", user });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor: " + err });
    }
  },

  async updatePassword(req, res) {
    try {
      const { _id, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.findOneAndUpdate(
        { _id: _id },
        { password: hashedPassword },
        { new: true }
      );

      res.json({ message: "Senha alterada com sucesso", user });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor: " + err });
    }
  },

  async updateName(req, res) {
    try {
      const { _id, firstName, surname } = req.body;
      const user = await User.findOneAndUpdate(
        { _id: _id },
        { firstName: firstName,
          surname: surname
         },
        { new: true }
      );

      res.json({ message: "nome alterado com sucesso", user });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor: " + err });
    }
  },

  async updateNumber(req, res) {
    try {
      const { _id, number } = req.body;
      const user = await User.findOneAndUpdate(
        { _id: _id },
        { phoneNumber: number },
        { new: true }
      );

      res.json({ message: "numerp alterado com sucesso", user });
    } catch (err) {
      res.status(500).json({ error: "Erro interno no servidor: " + err });
    }
  },

  async triggerNotification(req, res) {
    try {
      const { pushToken, title, body } = req.body;
      await sendPushNotification(pushToken, title, body);

      res.json({ success: true, message: "Notificação enviada com sucesso" });
    } catch (err) {
      res.status(500).json({ error: "Erro ao disparar notifição: " + err.message });
    }
  },

async verifyUserType(req, res) {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: "user_id é obrigatório." });
    }

    const properties = await Property.find({
      $or: [
        { user_id: user_id },
        { "collaborators.user_id": user_id }
      ]
    });

    const result = properties.map(property => {
      const isOwner = property.user_id.toString() === user_id.toString();
      const isCollaborator = property.collaborators.some(
        colab => colab.user_id.toString() === user_id.toString()
      );

      return {
        _id: property._id,
        name: property.name_Property,
        role: isOwner ? "owner" : isCollaborator ? "collaborator" : "none",
        property
      };
    });

    return res.json({
      count: result.length,
      properties: result
    });

  } catch (err) {
    console.error("Erro ao buscar propriedades:", err);
    return res.status(500).json({ error: "Erro interno ao buscar propriedades." });
  }
}
}

module.exports = { UserController };
