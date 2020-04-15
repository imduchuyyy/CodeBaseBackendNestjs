import * as dotenv from 'dotenv'
dotenv.config()

//environment
const NODE_ENV: string = process.env.NODE_ENV || 'development'

// application
const PORT: number = +process.env.PORT || 4000
const RATE_LIMIT_MAX: number = +process.env.RATE_LIMIT_MAX || 100
const DOMAIN: string = process.env.DOMAIN || 'localhost'
const END_POINT: string = process.env.END_POINT || 'graphql'
const PRIMARY_COLOR: string = process.env.PRIMARY_COLOR || '#ad4c45'

// secret key
const SECRET_KEY_TOKEN: string = process.env.SECRET_KEY_TOKEN || 'duchuy'

//jsonwebtoken
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'token'

export {
  PORT,
  DOMAIN,
  NODE_ENV,
  END_POINT,
  ACCESS_TOKEN,
  PRIMARY_COLOR,
  RATE_LIMIT_MAX,
  SECRET_KEY_TOKEN
}