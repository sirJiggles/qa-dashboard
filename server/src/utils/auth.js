import config from '../config'
import { User } from '../resources/user/user.model'
import jwt from 'jsonwebtoken'

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  })
}

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err)
      resolve(payload)
    })
  })

export const signup = async (req, res) => {
  // accept email pw
  // send back json web token on success
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send({
      message: 'you need to give email and pw for this end point home slice!'
    })
  }
  const userDoc = await User.create(req.body)
  if (!userDoc) {
    return res.status(500)
  }
  const token = await newToken(userDoc)
  return res.status(201).send({ token })
}

export const signin = async (req, res) => {
  // check if the creds are valid
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send({
      message: 'you need to give email and pw for this end point home slice!'
    })
  }

  const userDoc = await User.findOne({ email }).exec()
  if (!userDoc) {
    return res
      .status(401)
      .send({ message: 'could not find the user with the creds given' })
  }
  const pwChecksOut = await userDoc.checkPassword(password)
  if (!pwChecksOut) {
    return res.status(401).send({ message: 'password or email are incorrect' })
  }
  // if they are ok return jwt
  const token = await newToken(userDoc)
  return res.status(201).send({ token })
}

export const protect = async (req, res, next) => {
  let token = req.headers.authorization
  const prefix = 'Bearer '
  if (!token) {
    return res.status(401).end()
  }

  // token has correct prefix of Bearer
  if (!token.startsWith(prefix)) {
    return res.status(401).end()
  }

  // strip out the prefix from the token
  token = token.replace(prefix, '')

  // using the token look for the user in the database
  const verifiedTokenResource = await verifyToken(token)
  
  const user = await User.find(verifiedTokenResource)
  if (!user) {
    return res.status(404).end()
  }
  // add user to the req params
  req.user = user

  next()
}
