const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');

const updateEvents = async (parent, args, context) => {
  const {
    events,
  } = args;

  const eventsToArray = JSON.parse(events);


  const user = await authentication(context);

  user.events = [...eventsToArray];
  await user.save();

  return user.events;
};

module.exports = updateEvents;
