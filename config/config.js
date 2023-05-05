module.exports = {
    server: {
      port: {
        doc: 'The port to bind.',
        format: 'port',
        default: 3000,
        env: 'DEVICE_PORT',
        arg: 'port',
      },
      localhostIp: {
        doc: 'The IP address to bind.',
        format: String,
        default: '0.0.0.0',
        env: 'LOCAL_HOST_IP',
      },
      allowedOrigins: {
        doc: 'Allowed CORS',
        format: String,
        default: '',
        env: 'ALLOWED_ORIGINS',
      },
      logLevel: {
        doc: 'Pino log level',
        format: ['trace', 'debug', 'info', 'warn', 'error', 'fatal'],
        default: 'info',
        env: 'LOG_LEVEL',
      },
    },
    swagger: {
      apiUser: {
        doc: 'Swagger api-docs auth username.',
        format: String,
        default: 'nestjs',
        env: 'SWAGGER_USER',
      },
      apiPass: {
        doc: 'Swagger api-docs auth password.',
        format: String,
        default: 'nesjts',
        env: 'SWAGGER_PASS',
      },
    }
  };
  