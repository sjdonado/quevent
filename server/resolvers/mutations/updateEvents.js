const { authentication } = require('../../services/auth');

const updateEvents = async (parent, args, context) => {
  const {
    events,
  } = args;

  const user = await authentication(context);

  user.events = user.events.map((event) => {
    const eventIdx = events.findIndex(({ _id }) => event.getId() === _id);
    if (eventIdx !== -1) {
      return Object.assign(event, events[eventIdx]);
    }
    return event;
  });
  await user.save();

  return user.events;
};

module.exports = updateEvents;
