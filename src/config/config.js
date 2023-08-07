const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');

dotenv.config({ path: path.join(__dirname, '../../.env') });

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(3000),
    PG_USER_NAME: Joi.string().required().description('Postgress Username is required!'),
    PG_PASSWORD: Joi.string().required().description('Postgress Password is required!'),
    PG_HOST: Joi.string().required().description('Postgress Host name is required!'),
    PG_PORT: Joi.number().required().description('Postgress Port is required!'),
    PG_DATABASE: Joi.string().required().description('Postgress Database name is required!'),
    PG_MAX_CONN_POOL :Joi.number().required().description('Postgress Maximum connection pool number is required!'),
    PG_IDLE_TIMEOUT :Joi.number().required().description('Postgress Idle timeout is required!'),
    PG_CONN_TIMEOUT :Joi.number().required().description('Postgress Connection timeout is required!'),

    // JWT_SECRET: Joi.string().required().description('JWT secret key'),
    // JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    // JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    // JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
    //   .default(10)
    //   .description('minutes after which reset password token expires'),
    // JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
    //   .default(10)
    //   .description('minutes after which verify email token expires'),
    // SMTP_HOST: Joi.string().description('server that will send the emails'),
    // SMTP_PORT: Joi.number().description('port to connect to the email server'),
    // SMTP_USERNAME: Joi.string().description('username for email server'),
    // SMTP_PASSWORD: Joi.string().description('password for email server'),
    // EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown();

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  postgres: {
    userName: process.env.PG_USER_NAME,
    pswd: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    idleTimeOut: process.env.PG_IDLE_TIMEOUT,
    connTimeOut: process.env.PG_CONN_TIMEOUT,
    maxConn: process.env.PG_MAX_CONN,
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
  },
};
