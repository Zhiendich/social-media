const Router = require("express");
const router = new Router();
const controller = require("../controllers/userController");
const { check } = require("express-validator");
const checkAuth = require("../middleware/checkAuth");
router.post(
  "/registration",
  [
    check("fullName", "Имя не может быть пустым").notEmpty(),
    check("email", "Неправильный Email").isEmail(),
    check("password", "Пароль должен быть длинее 6 символов").isLength({
      min: 6,
    }),
    check("phone", "Телефон не может быть пустым").notEmpty(),
  ],
  controller.registration
);
router.post("/auth", controller.authorization);
router.get("/getUser", checkAuth, controller.isUserAuth);
router.get("/getUsers", controller.getAllUsers);
router.get("/:id", controller.getUser);
router.put("/follow/:id", controller.addFriend);
router.put("/unfollow/:id", controller.removeFriend);
router.get("/friends/:id", controller.getFriends);
router.put("/profile/:id", controller.changeProfile);

module.exports = router;
