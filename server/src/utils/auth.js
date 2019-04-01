import config from '../config';
import { User } from '../resources/user/user.model';
import jwt from 'jsonwebtoken';

export const newToken = user => {
  return jwt.sign({ id: user.id }, config.secrets.jwt, {
    expiresIn: config.secrets.jwtExp
  });
};

export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.jwt, (err, payload) => {
      if (err) return reject(err);
      resolve(payload);
    });
  });

export const signup = async (req, res) => {
  // accept username pw
  // send back json web token on success
  const { username, password } = req.body;
  if (!username || !password) {
    return res
      .status(400)
      .send({
        error: 'errors.register.need_deets'
      })
      .end();
  }
  let userDoc;
  try {
    userDoc = await User.create(req.body);

    if (!userDoc) {
      return res
        .status(500)
        .send({ error: 'errors.register.could_not_create' });
    }
  } catch (err) {
    res.status(500).send({
      error: 'errors.register.name_taken'
    });
  }

  const token = await newToken(userDoc);
  token.delete('password');
  return res.status(201).send({ token });
};

export const signin = async (req, res) => {
  // check if the creds are valid
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send({
      error: 'errors.login.fields_needed'
    });
  }

  const userDoc = await User.findOne({ username }).exec();
  if (!userDoc) {
    return res.status(401).send({ error: 'errors.login.not_found' });
  }
  const pwChecksOut = await userDoc.checkPassword(password);
  if (!pwChecksOut) {
    return res.status(401).send({ error: 'errors.login.incorrect' });
  }
  // if they are ok return jwt
  const token = await newToken(userDoc);
  token.delete('password');
  return res.status(201).send({ token });
};

export const protect = async (req, res, next) => {
  let token = req.headers.authorization;
  const prefix = 'Bearer ';
  if (!token) {
    return res
      .status(401)
      .send({ error: 'errors.protected.no_token' })
      .end();
  }

  // token has correct prefix of Bearer
  if (!token.startsWith(prefix)) {
    return res
      .status(401)
      .send({ error: 'errors.protected.invalid_token' })
      .end();
  }

  // strip out the prefix from the token
  token = token.replace(prefix, '');

  // using the token look for the user in the database
  const verifiedTokenResource = await verifyToken(token);

  const user = await User.findOne(verifiedTokenResource).exec();
  if (!user) {
    return res
      .status(404)
      .send({ error: 'errors.protected.user_mis_match' })
      .end();
  }

  // add user to the req params
  req.user = user;
  next();
};
