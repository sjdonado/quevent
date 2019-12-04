const { signToken, googleOauth } = require('../../services/auth');
// const { createToken } = require('../../services/auth');

const login = async (parent, { idToken }, context) => {
  const googleUser = await googleOauth(idToken);
  const { name, email, profilePicture } = googleUser;
  let user = await context.models.User.findOne({ email });

  if (!user) {
    const newUser = new context.models.User({
      name,
      email,
      profilePicture,
    });

    user = await newUser.save();
  }
  const token = signToken(user.id);

  return {
    token,
    user,
  };
};

module.exports = login;
