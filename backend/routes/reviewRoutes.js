const express = require("express");
const router = express.Router({ mergeParams: true });
const isAuthenticated = require("../middlewares/auth.js");

const { postReview } = require("../controllers/reviewController.js");

router.post("/", isAuthenticated, postReview);

module.exports = router;
