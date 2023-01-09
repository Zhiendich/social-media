const Router = require("express");
const router = new Router();
const controller = require("../controllers/conversationController");

router.post("/", controller.makeConversation);
router.get("/:userId", controller.getConversations);
router.get("/find/:id", controller.getUsersConversation);
// router.get("/find/:firstUserId/:secondUserId", controller.getUsersConversation);

module.exports = router;
