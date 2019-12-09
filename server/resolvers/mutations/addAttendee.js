const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');

const addAttendee = async (parent, { eventId, email }, context) => {
  const user = await authentication(context);

  const eventIdx = user.events.findIndex(({ id }) => id === eventId);
  if (eventIdx === -1) {
    throw new ApolloError('Event not found', 404);
  }

  const index = user.events[eventIdx].attendance.push({
    email,
  });

  await user.save();

  return user.events[eventIdx].attendance[index - 1];
};

module.exports = addAttendee;
