if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blogsSchema.js");
// const  BlogRouter  = require("./routes/blogsRoutes.js");
const cors = require("cors");
const path = require("path");
// const dotenv = require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://blogging-website-2-qfpy.onrender.com",
    credentials: true,
  })
);
app.use(express.static(path.join(__dirname, "../frontend/dist")));

main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}

// app.get("/testblogs", async (req, res) => {
//   let sampleBlog = new Blog({
//     title: "The Rise of AI: Revolutionizing Technology",
//     content:
//       "Artificial Intelligence (AI) is reshaping industries, from healthcare to finance. Its applications in natural language processing and image recognition have opened new possibilities. However, ethical considerations remain crucial as we navigate this AI-driven era.",
//   });
//   await sampleBlog.save();
//   console.log("Sample was saved");
//   res.send("SUCCESS");
// });

app.use("/blogs", require("./routes/blogsRoutes.js"));
app.use("/users", require("./routes/userRoutes.js"));
app.use("/blogs/:id/comments", require("./routes/reviewRoutes.js"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Success");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
