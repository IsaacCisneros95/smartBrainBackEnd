const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0; // To prevent code: 'DEPTH_ZERO_SELF_SIGNED_CERT' error
const db = require("knex")({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: true,
  },
});

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("smartbrain API");
});
app.post("/register", register.handleRegister(db, bcrypt));
app.post("/signin", signin.handleSignin(db, bcrypt));
app.get("/profile/:id", profile.handleProfileGet(db));
app.post("/imageurl", image.handleApiCall);
app.put("/image", image.handleImage(db));

const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
