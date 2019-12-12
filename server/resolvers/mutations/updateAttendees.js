const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');

const updateAttendees = async (parent, args, context) => {
  const {
    eventId,
    attendees,
  } = args;

  const attendeesToArray = JSON.parse(attendees);

  const user = await authentication(context);

  const eventIdx = user.events.findIndex(({ id }) => id === eventId);
  if (eventIdx === -1) {
    throw new ApolloError('Event not found', 404);
  }

  user.events[eventIdx].attendance = [...attendeesToArray];

  await user.save();

  return user.events[eventIdx].attendance;
};

module.exports = updateAttendees;
