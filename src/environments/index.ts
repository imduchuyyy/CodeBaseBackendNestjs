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

// mlab
const MLAB_USER: string = process.env.MLAB_USER || 'duchuy'
const MLAB_PASS: string = process.env.MLAB_PASS || '123'
const MLAB_DATABASE: string = process.env.MLAB_DATABASE || 'blog'
const MLAB_URL: string = process.env.MLAB_URL || `mongodb+srv://${MLAB_USER}:${MLAB_PASS}@cluster0-yyvtg.mongodb.net/test?retryWrites=true&w=majority`

// mongodb
const MONGO_DB: string = process.env.MONGO_DB || 'duchuy'

// secret key
const SECRET_KEY_TOKEN: string = process.env.SECRET_KEY_TOKEN || 'duchuy'

//jsonwebtoken
const ACCESS_TOKEN: string = process.env.ACCESS_TOKEN || 'token'

export {
  PORT,
  DOMAIN,
  NODE_ENV,
  MLAB_URL,
  MONGO_DB,
  END_POINT,
  ACCESS_TOKEN,
  MLAB_DATABASE,
  PRIMARY_COLOR,
  RATE_LIMIT_MAX,
  SECRET_KEY_TOKEN
}