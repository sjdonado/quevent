const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');

const deactivateEvent = async (parent, args, context) => {
  const {
    eventId,
    name,
    startDate,
    endDate,
    active,
  } = args;

  const user = await authentication(context);

  const eventIdx = user.events.findIndex((event) => event.id === eventId);
  if (eventIdx === -1) {
    throw new ApolloError('Event not found', 404);
  }

  const event = user.events[eventIdx];

  user.events[eventIdx] = Object.assign(event, {
    name: name || event.name,
    startDate: startDate || event.startDate,
    endDate: endDate || event.endDate,
    active: active || event.active,
  });

  await user.save();

  return user.events[eventIdx];
};

module.exports = deactivateEvent;
