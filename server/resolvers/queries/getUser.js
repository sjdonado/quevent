const { authentication } = require('../../services/auth');

const getUser = async (parent, args, context) => {
  const user = await authentication(context.authToken);
  return user;
};

module.exports = getUser;
