const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const Blog=require("./models/blog")
const app = express();
const userRoutes = require("./routes/user");
const blogRoutes = require("./routes/blog");
const { default: mongoose } = require("mongoose");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");
app.use(express.static(path.resolve("./public")))


const PORT = 8000;
mongoose.connect("mongodb://localhost:27017/blogify").then(() => {
  console.log("mongodb connected");
});
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.get("/", async(req, res) => {
  const blogs=await Blog.find({})
  return res.render("home", {
   blogs,
  });
});
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
app.listen(PORT, () => {
  console.log(`app run on port${PORT}`);
});
