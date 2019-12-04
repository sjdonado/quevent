const { sign, verify } = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const { ApolloError } = require('apollo-server');

const { server } = require('../config');

const { googleClientId, secret } = server;
const oauth2Client = new OAuth2Client(googleClientId);

/**
 * Get user by JWT token
 * @param {String} userId
 */
const authentication = async (context) => {
  const token  = context.authToken.substring(7);

  if (!token) {
    throw new ApolloError('Auth token is not supplied', 400);
  }

  return verify(token, secret, async (err, decoded) => {
    if (err) {
      throw new ApolloError('Unauthorized', 401);
    }

    const { userId, iat, exp } = decoded;

    if (exp - iat < 0) {
      throw new ApolloError('Auth Token expired', 400);
    }

    const user = await context.models.User.findById(userId);

    if (!user) {
      throw new ApolloError('User not found, invalid auth token', 404);
    }

    return user;
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
