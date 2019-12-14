const { authentication } = require('../../services/auth');

const getUser = async (parent, args, context) => {
  const user = await authentication(context);
  return user;
};

module.exports = getUser;
