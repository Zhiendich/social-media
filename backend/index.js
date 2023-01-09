const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const express = require("express");
const userRouter = require("./routes/userRouter");
const postRouter = require("./routes/postRouter");
const conversationRouter = require("./routes/conversationRouter");
const messageRouter = require("./routes/messageRouter");
const multer = require("multer");
const path = require("path");

const app = express();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname, req.body.name);
  },
});

const upload = multer({ storage });
app.use("/images", express.static(path.join(__dirname, "public/images")));
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use(express.json());
app.use(cors());

app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/message", messageRouter);

const startApp = async () => {
  try {
    await mongoose
      .connect(process.env.DB_URL)
      .then(() => {
        console.log("Db connected");
      })
      .catch((error) => {
        console.log("Db error", error);
      });
    app.listen(process.env.PORT, () => {
      console.log("Сервер воркает");
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
