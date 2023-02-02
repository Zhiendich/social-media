const Router = require("express");
const router = new Router();
const controller = require("../controllers/postController");

router.post("/", controller.addPost);
router.put("/:id", controller.updatePost);
router.delete("/:id", controller.deletePost);
router.get("/posts", controller.getAllPosts);
router.put("/like/:id", controller.likePost);
router.get("/profile/:id", controller.getUsersPosts);

module.exports = router;
