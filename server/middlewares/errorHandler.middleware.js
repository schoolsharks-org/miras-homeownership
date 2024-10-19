import AppError from '../utils/appError.js';

const errorHandlerMiddleware = (
    err,
    req,
    res,
    next
) => {
    console.log("---errorHandlerMiddleware---");
    console.log(err);
    let error;

    if (err) {
        error = err;
    } else {
        error = new AppError(
            err.message || 'Something went wrong, try again later',
            err.statusCode || 500
        );
    }

    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors)
            .map((item) => item.message)
            .join(',');
        error = new AppError(message, 401);
    }

    if (err.code && err.code === 11000) {
        error = new AppError(
            `${Object.keys(err.keyValue)} field must be unique`,
            401
        );
    }

    res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
    });
};

export default errorHandlerMiddleware;

