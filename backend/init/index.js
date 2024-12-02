const mongoose = require("mongoose");
const initData = require("./blogsData.js");
const Blog = require("../models/blogsSchema.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/blogs";

main()
  .then(() => {
    console.log("Connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Blog.deleteMany({});
  //   initData.data = initData.data.map((obj) => ({
  //     ...obj,
  //     owner: "6679be1fadea7d6751565f1e",
  //   })); // to add owner in every listing
  await Blog.insertMany(initData.data);
  console.log("Data was initialized");
};

initDB();
