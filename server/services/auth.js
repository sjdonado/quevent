const { sign, verify } = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { ApolloError } = require('apollo-server');

const { server } = require('../config');
const { User } = require('../models');

const { googleClientId, secret } = server;
const oauth2Client = new OAuth2Client(googleClientId);

/**
 * Generate new JWT
 * @param {String} userId
 */

const authentication = async (authToken) => {
  const token  = authToken.substring(7);
  if (!token) {
    new ApolloError('Auth token is not supplied', 400);
  }

  return verify(token, secret, async (err, decoded) => {
    if (err) {
      new ApolloError('Unauthorized', 401);
    }

    const { userId, iat, exp } = decoded;

    if (exp - iat < 0) {
      new ApolloError('Auth Token expired', 400);
    }

    return User.findById(userId);
  });
};

/**
 * Generate new JWT
 * @param {String} userId
 */
const signToken = (userId) => `Bearer ${sign({ userId }, secret, { expiresIn: '24h' })}`;

/**
 * Google oauth
 * @param {String} Google oauth2 token
 */
const googleOauth = async (idToken) => {
  // console.log('token', token, 'clientId', clientId);
  const data = await oauth2Client.verifyIdToken({
    idToken,
    audience: googleClientId,
  });
  const { name, email, picture } = data.getPayload();
  return {
    name,
    email,
    profilePicture: picture,
  };
};

module.exports = {
  authentication,
  signToken,
  googleOauth,
};
