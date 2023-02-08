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
      if (posts) {
        return res.status(200).json(posts);
      } else {
        return res.status(200).json("Не нашел пользовательских постов");
      }
    } catch (error) {
      res
        .status(400)
        .json({ message: "Не удалось получить посты пользователя" });
    }
  }

  async likePost(req, res) {
    try {
      const post = await Post.findById(req.params.id).populate("user");
      if (post) {
        if (!post.likes.includes(req.body.userId)) {
          post.likes = [req.body.userId, ...post.likes];
          await post.updateOne({
            $push: { likes: req.body.userId },
          });
          res.status(200).json({ post });
        } else {
          post.likes = post.likes.filter(
            (userId) => userId !== req.body.userId
          );
          await post.updateOne({
            $pull: { likes: req.body.userId },
          });
          res.status(200).json({ post });
        }
      } else {
        throw Error("Не нашел пост");
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Не удалось поставить лайк" });
    }
  }

  async getAllPosts(req, res) {
    try {
      const posts = await Post.find().populate("user").exec();
      if (posts) {
        return res.status(200).json(posts);
      } else {
        throw Error("Не нашел постов");
      }
    } catch (error) {
      res.status(400).json({ message: "Не удалось получит все посты" });
    }
  }
}

module.exports = new postController();
