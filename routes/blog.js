const express = require("express");
const multer = require("multer");
const { Blog } = require("../models/blog");
const { comment } = require("../models/comment");
const router = express.Router();
comment;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/uploads/");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    return cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/blog", (req, res) => {
  return res.render("addBlog");
});

router.get("/images", (req, res) => {
  return res.render("addBlog");
});

router.get("/about", (req, res) => {
  return res.render("about");
});
router.post("/blog", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  const blog = await Blog.create({
    title: title,
    body: body,
    createdBy: req.user.id,
    coverImageUrl: `/uploads/${req.file.filename}`,
  });
  console.log("Blog", blog);

  return res.redirect("/");
});
router.post("/blog/comment/:blogId", async (req, res) => {
  console.log("user", req.user);
  const Comment = await comment.create({
    comment: req.body.comment,
    blogId: req.params.blogId,
    createdBy: req.user.id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});

router.get("/blog/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const Comments = await comment
    .find({ blogId: req.params.id })
    .populate("createdBy");

  return res.render("blog", {
    user: req.user,
    blog: blog,
    comments: Comments,
  });
});

module.exports = router;
