import AppError from '../utils/appError.js';

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log("---errorHandlerMiddleware---");
    console.log(err);

    let error = { ...err };
    error.message = err.message;

    if (!error.statusCode) {
        error.statusCode = 500;
        error.status = 'error';
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
        error = new AppError(message, 400);
    }

    if (err.code && err.code === 11000) {
        const message = `${Object.keys(err.keyValue)} field must be unique`;
        error = new AppError(message, 400);
    }

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message || 'Something went wrong, try again later',
    });
};

export default errorHandlerMiddleware;
