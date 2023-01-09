const Post = require("../models/Post");

class postController {
  async addPost(req, res) {
    try {
      const { userId, desc, img, likes } = req.body;
      const post = await new Post({
        user: userId,
        desc,
        img,
        likes,
      }).populate("user");
      await post.save();
      return res.status(200).json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Не удалось создать новость" });
    }
  }
  async updatePost(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate("user");
      if (post.user._id.toString() === req.body.userId) {
        await post.updateOne({ $set: req.body });
        post.desc = req.body.desc;
        return res.status(200).json(post);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Не удалось обновить новость" });
    }
  }
  async deletePost(req, res) {
    try {
      const post = await Post.findById(req.params.id);
      if (post.user.toString() === req.body.userId) {
        await post.deleteOne();
        return res.status(200).json(post.id);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Не удалось удалить новость" });
    }
  }

  async getUsersPosts(req, res) {
    try {
      const posts = await Post.find({ user: req.params.id }).populate("user");
      return res.status(200).json(posts);
    } catch (error) {
      res
        .status(400)
        .json({ message: "Не удалось получить посты пользователя" });
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await Post.find().populate("user").exec();
      return res.status(200).json(posts);
    } catch (error) {
      res.status(400).json({ message: "Не удалось получит все посты" });
    }
  }
}

module.exports = new postController();
