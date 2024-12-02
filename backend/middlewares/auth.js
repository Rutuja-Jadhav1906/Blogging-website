const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const isAuthenticated = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1]; // Get the token from headers

  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authorization denied" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = isAuthenticated;
