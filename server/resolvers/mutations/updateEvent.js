const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');

const updateEvent = async (parent, args, context) => {
  const {
    eventId,
    name,
    description,
    location,
    startDate,
    endDate,
  } = args;

  const user = await authentication(context);

  const eventIdx = user.events.findIndex((event) => event.id === eventId);
  if (eventIdx === -1) {
    throw new ApolloError('Event not found', 404);
  }

  const event = user.events[eventIdx];

  Object.assign(event, {
    name: name || event.name,
    startDate: startDate || event.startDate,
    endDate: endDate || event.endDate,
    description: description || event.description,
    location: location || event.location,
  });

  await user.save();

  return event;
};

module.exports = updateEvent;
