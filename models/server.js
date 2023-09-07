const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../databse/config')

const RESPONSE_CODES = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTIPLE_CHOICES: 300,
  MODEV_PERMANENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  UNUSED: 306,
  TEMPORARY_REDIRECT: 307,
  BAD_REQUEST: 400,
  UNATHORIZAED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  RESQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  REQUEST_ENTITY_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  REQUEST_RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505
}

class Server {
  constructor() {
    this.app = express()
    this.port = process.env.PORT
    this.apiRoutes = {
      auth: {
        url: '/api/auth',
        path: '../routes/auth.routes'
      },
      users: {
        url: '/api/users',
        path: '../routes/users.routes'
      }
    }

    this.dbConnect()
    this.middlewars()
    this.routes()
  }

  async dbConnect(){
    await dbConnection()
  }

  middlewars() {
    this.app.use(cors())
    this.app.use(express.json())
    this.app.use(express.static('public'))
  }

  routes() {
    this.app.use(
      this.apiRoutes.users.url,
      require(this.apiRoutes.users.path)
    )

    this.app.use(
      this.apiRoutes.auth.url,
      require(this.apiRoutes.auth.path)
    )
  }

  listen(){
    this.app.listen(this.port, () => {
      console.log(`Example app listening on PORT ${this.port}`)
    })
  }
}

module.exports = Server;
