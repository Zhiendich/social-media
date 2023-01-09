const Conversation = require("../models/Conversation");

class conversationController {
  async makeConversation(req, res) {
    try {
      const newConversation = new Conversation({
        members: [req.body.senderId, req.body.recieverId],
      });
      newConversation.save();
      return res.status(200).json(newConversation);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Не удалось создать диалог" });
    }
  }

  async getConversations(req, res) {
    try {
      const conversation = await Conversation.find({
        members: { $in: [req.params.userId] },
      });
      res.status(200).json(conversation);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Не удалось получить диалоги" });
    }
  }

  async getUsersConversation(req, res) {
    try {
      const conversation = await Conversation.findOne({
        _id: req.params.id,
      });
      return res.status(200).json(conversation);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Не удалось получить диалог " });
    }
  }
}

//   async getUsersConversation(req, res) {
//     try {
//       const conversation = await Conversation.findOne({
//         members: { $all: [req.params.firstUserId, req.params.secondUserId] },
//       });
//       return res.status(200).json(conversation);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "Не удалось получить диалоги 2 " });
//     }
//   }

module.exports = new conversationController();
