const Message = require("../models/Message");

class messageController {
  async addMessage(req, res) {
    const newMessage = new Message(req.body);
    try {
      const savedMessage = await newMessage.save();
      res.status(200).json(savedMessage);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Не удалось отправить сообщение" });
    }
  }

  async getMessages(req, res) {
    try {
      const messages = await Message.find({
        conversationId: req.params.conversationId,
      });
      return res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Не удалось получить сообщения" });
    }
  }
}

module.exports = new messageController();
