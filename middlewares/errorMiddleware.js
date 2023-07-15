import ErrorHandler from "../utils/ErrorHandler.js";

const errorResponse = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Something wrong';

    res.status(err.statusCode).send({
        success: false,
        message: err.message,
        err: err,
        stack: err.stack 
    })
}

export default errorResponse;