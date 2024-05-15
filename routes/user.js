const express = require("express");
const { User } = require("../models/user");
const { Blog } = require("../models/blog");

const router = express.Router();

router.get("/", async (req, res) => {
  const allblogs = await Blog.find({});

  return res.render("home", {
    user: req.user,
    blogs: allblogs,
  });
});

router.get("/images", async (req, res) => {
  const allblogs = await Blog.find({});

  return res.render("gallery", {
    user: req.user,
    blogs: allblogs,
  });
});

router.get("/user/signin", (req, res) => {
  return res.render("signin");
});

router.get("/user/signup", (req, res) => {
  return res.render("signup");
});

router.post("/user/signup", async (req, res) => {
  const { fullname, email, password } = req.body;

  await User.create({
    fullname,
    email,
    password,
  });

  return res.redirect("signin");
});

router.post("/user/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await User.matchPasswordGenerateToken(email, password);

    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Incorrect password and email" });
  }
});

router.get("/user/logout", (req, res) => {
  return res.clearCookie("token").redirect("/");
});

module.exports = router;
