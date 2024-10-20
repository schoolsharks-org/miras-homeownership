const notFoundMiddleware = (req, res, next) => {
  console.log("---notFoundMiddleware---");
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.statusCode = 404; 
  next(error);
};

export default notFoundMiddleware;