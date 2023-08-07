
const httpStatus = require('http-status');
const config = require('../config/config');
const logger = require('../config/logger');
const ApiError = require('../utils/ApiError');

const TypeORMErrors  = require('typeorm');

const errorConverter = (err, req, res, next) => {
  let error = err;
  let statusCode=httpStatus.INTERNAL_SERVER_ERROR;
  if (!(error instanceof ApiError)) {
    for (const errorClass of Object.values(TypeORMErrors)) {
      if (error instanceof errorClass) {
        console.log(`This is a ${errorClass.name}:`, error);
        statusCode=httpStatus.BAD_REQUEST
        break;
      }
    }

    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  if (config.env === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(config.env === 'development' && { stack: err.stack }),
  };

  if (config.env === 'development') {
    logger.error(err);
  }

  res.status(statusCode).send(response);
};

module.exports = {
  errorConverter,
  errorHandler,
};
