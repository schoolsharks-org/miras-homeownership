
const notFoundMiddleware = (req, res, next) => {
  console.log("---notFoundMiddleware---");
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export default notFoundMiddleware;


