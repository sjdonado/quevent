const { authentication } = require('../../services/auth');

const deactivateEvent = async (parent, { id, name, startDate, endDate, active }, context) => {
  const user = await authentication(context);

  const eventIdx = user.events.findIndex((event) => event.id === id);
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
