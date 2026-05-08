const errorHandler = (err, req, res, next) => {
  console.error("Error:", err.message);

  // Mongoose duplicate key
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({
      success: false,
      message: messages.join(", "),
    });
  }

  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

module.exports = errorHandler;