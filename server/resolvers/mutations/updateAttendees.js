const { ApolloError } = require('apollo-server');
const { authentication } = require('../../services/auth');

const updateAttendees = async (parent, args, context) => {
  const {
    eventId,
    attendees,
  } = args;

  const user = await authentication(context);

  const eventIdx = user.events.findIndex(({ id }) => id === eventId);
  if (eventIdx === -1) {
    throw new ApolloError('Event not found', 404);
  }

  const event = user.events[eventIdx];
  if (!event.active) {
    throw new ApolloError('The event is not active', 400);
  }

  Object.assign(event, {
    attendance: event.attendance.map((attendee) => {
      const attendeeIdx = attendees.findIndex(({ _id }) => attendee.getId() === _id);
      if (attendeeIdx !== -1) {
        return Object.assign(attendee, attendees[attendeeIdx]);
      }
      return attendee;
    }),
  });

  await user.save();

  return event.attendance;
};

module.exports = updateAttendees;
