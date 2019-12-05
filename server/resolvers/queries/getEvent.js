const { authentication } = require('../../services/auth');

const getEvent = async (parent, { eventId }, context) => {
  const user = await authentication(context);
  const { events } = user;
  const event = events.find((event) => event.id === eventId);
  return event;
};

module.exports = getEvent;
