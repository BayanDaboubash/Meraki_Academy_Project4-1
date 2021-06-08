const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db/db");
const app = express();
const ser = require("./db/models/supService");
//routers

const profileRouter = require("./routers/routes/profile");
const registerRouter = require("./routers/routes/auth/signUp");
const supRouter = require("./routers/routes/secund");
const loginRouter = require("./routers/routes/auth/login");
const commentRouter = require("./routers/routes/comment");
const favoriteRouter = require("./routers/routes/favorite");
const serviceRouter = require("./routers/routes/service");
const servicesRouter = require("./routers/routes/thirdPage");

//built-in middlewares
app.use(express.json());

//third-party middleware
app.use(cors());

//app routers
app.use(registerRouter);
app.use(commentRouter);
app.use("/profile", profileRouter);
app.use(supRouter);
app.use(loginRouter);
app.use(favoriteRouter);
app.use(serviceRouter);
app.use(servicesRouter);

app.put("/ratting", (req, res) => {
  const { id, numberOfVoters, rating } = req.body;
  ser
    .findOneAndUpdate({ _id: id }, { numberOfVoters, rating }, { new: true })
    .then((result) => {
      console.log(result);
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server On ${PORT}`);
});
