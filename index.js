import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import UserRoute from "./routes/UserRoute.js";
// import GrupRoute from "./routes/GrupRoute.js";
import AuthRoute from "./routes/AuthRoute.js";
import StasiunRoute from "./routes/StasiunRoute.js";
import RobotRoute from "./routes/RobotRoute.js";

import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";

dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

(async () => {
  await db.sync();
})();
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  }),
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  }),
);
app.use(express.json());
app.use(UserRoute);
app.use(AuthRoute);
app.use(StasiunRoute);
app.use(RobotRoute);

// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("server up and running...");
});
