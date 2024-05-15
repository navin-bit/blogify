require("dotenv").config();
const express = require("express");
const { connectMongoDB } = require("./db/connectdb");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const { checkAuthCookie } = require("./middlewares/auth");

connectMongoDB(process.env.MONGO_URL);

const app = express();
const port = process.env.PORT || 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use(cookieParser());
app.use(checkAuthCookie("token"));

app.use("/", userRoutes);

app.use("/", blogRoutes);

app.listen(port, () => console.log(`http://localhost:${port}`));
