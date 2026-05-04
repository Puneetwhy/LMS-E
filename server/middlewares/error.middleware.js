const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong";

  // ================= MONGOOSE ERRORS =================
  if (err.name === "CastError") {
    message = `Invalid ${err.path}`;
    statusCode = 400;
  }

  if (err.code === 11000) {
    message = `Duplicate field value entered: ${Object.keys(err.keyValue)}`;
    statusCode = 400;
  }

  if (err.name === "ValidationError") {
    message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    statusCode = 400;
  }

  // ================= JWT ERRORS =================
  if (err.name === "JsonWebTokenError") {
    message = "Invalid token, please login again";
    statusCode = 401;
  }

  if (err.name === "TokenExpiredError") {
    message = "Session expired, please login again";
    statusCode = 401;
  }

  // ================= MULTER ERRORS =================
  if (err.code === "LIMIT_FILE_SIZE") {
    message = "File size too large";
    statusCode = 400;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
      error: err,
    }),
  });
};

export default errorMiddleware;