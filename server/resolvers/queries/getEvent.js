const { ApolloError } = require('apollo-server');
const { authentication } = require('../../services/auth');

const getEvent = async (parent, { eventId }, context) => {
  const user = await authentication(context);
  const { events } = user;

  const eventIdx = user.events.findIndex(({ id }) => id === eventId);
  if (eventIdx === -1) {
    throw new ApolloError('Event not found', 404);
  }

  const event = events.find((event) => event.id === eventId);
  return event;
};

module.exports = getEvent;
