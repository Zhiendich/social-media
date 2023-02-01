const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccesToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "14d" });
};

class userController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при валидации", errors });
      }
      const { email, phone, fullName, password } = req.body;
      const findCandidate = await User.findOne({ email });
      if (findCandidate) {
        return res.status(400).json({ message: "Этот email уже занят" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        email,
        phone,
        fullName,
        password: hashPassword,
      });
      await user.save();
      return res.json({ message: "Пользоветль успешно зарегистрирован" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Registration error" });
    }
  }

  async authorization(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Ошибка при валидации", errors });
      }
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "Такого пользователя не существует" });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(400).json({ message: "Неверный пароль" });
      }
      const token = generateAccesToken(user._id);
      return res.json({ token, user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Authorization error" });
    }
  }

  async isUserAuth(req, res) {
    try {
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      const { password, ...userData } = user._doc;
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: " Пользователь не найден" });
    }
  }
  async getAllUsers(req, res) {
    try {
      const users = await User.find();
      if (!users) {
        return res.status(400).json({ message: "Пользователи не найдены" });
      }
      const filteredUsers = users.filter(
        (user) => user._id.toString() !== req.query.id
      );

      return res.json(filteredUsers);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: " Пользователи не найдены" });
    }
  }

  async getUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res.status(400).json({ message: "Пользователи не найдены" });
      }
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: " Пользователи не найдены" });
    }
  }

  async addFriend(req, res) {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followings.includes(req.body.userId)) {
          await user.updateOne({ $push: { followings: req.body.userId } });
          await currentUser.updateOne({ $push: { followers: req.params.id } });
          const updatedUser = await User.findById(req.params.id);
          return res.status(200).json(updatedUser);
        } else {
          return res.status(403).json("Пользователи уже дружат");
        }
      } catch (error) {
        console.log(error);
        return res.status(400).json({ message: " Пользователь не найдены" });
      }
    } else {
      return res.status(403).json("Нельзя подружиться с самим собой");
    }
  }

  async removeFriend(req, res) {
    if (req.body.userId !== req.params.id) {
      try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if (!user.followers.includes(req.body.userId)) {
          await user.updateOne({ $pull: { followings: req.body.userId } });
          await currentUser.updateOne({ $pull: { followers: req.params.id } });
          const updatedUser = await User.findById(req.params.id);
          return res.status(200).json(updatedUser);
        } else {
          return res.status(403).json("Пользователь не является вашим другом");
        }
      } catch (error) {
        console.log(error);
        return res
          .status(400)
          .json({ message: "Нельзя удалить себя из друзей" });
      }
    } else {
      return res.status(403);
    }
  }

  async getFriends(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        const friends = await Promise.all(
          user.followings.map((friendId) => {
            return User.findById(friendId);
          })
        );
        let friendList = [];
        friends.map((friend) => {
          const { _id, fullName, avatar } = friend;
          friendList.push({ _id, fullName, avatar });
        });
        return res.status(200).json(friendList);
      } else {
        throw Error("НЕ удалось получить друзей пользователя");
      }
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: "НЕ удалось получить друзей пользователя" });
    }
  }
  async changeProfile(req, res) {
    try {
      const user = await User.findById(req.params.id);
      if (user) {
        await user.updateOne({ $set: req.body.data });
        const updatedUser = await User.findById(req.params.id);
        res.status(200).json(updatedUser);
      }
    } catch (error) {
      console.log(error);
      res
        .status(400)
        .json({ message: "НЕ удалось изменить данные о пользователе" });
    }
  }
}

module.exports = new userController();
