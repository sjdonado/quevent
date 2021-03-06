const { authentication } = require('../../services/auth');

const createEvent = async (parent, args, context) => {
  const {
    name,
    description,
    location,
    startDate,
    endDate,
  } = args;

  const user = await authentication(context);

  const index = user.events.push({
    name,
    description,
    location,
    startDate,
    endDate,
    author: user.email,
  });
  await user.save();

  return user.events[index - 1];
};

module.exports = createEvent;
