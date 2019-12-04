const { authentication } = require('../../services/auth');

const createEvent = async (parent, { name, startDate, endDate }, context) => {
  const user = await authentication(context);

  const index = user.events.push({
    name,
    startDate,
    endDate,
    author: user.email,
  });

  await user.save();

  return user.events[index - 1];
};

module.exports = createEvent;