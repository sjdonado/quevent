const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');

const addAttendee = async (parent, { eventId, attendees }, context) => {
  const user = await authentication(context);

  const eventIdx = user.events.findIndex(({ id }) => id === eventId);
  if (eventIdx === -1) {
    throw new ApolloError('Event not found', 404);
  }

  user.events[eventIdx].attendance = [...attendees];

  await user.save();

  return user.events[eventIdx].attendance;
};

module.exports = addAttendee;
