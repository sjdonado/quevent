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

  const { attendance } = user.events[eventIdx];
  user.events[eventIdx].attendance = attendance.map((attendee) => {
    const attendeeIdx = attendees.findIndex(({ _id }) => attendee.getId() === _id);
    if (attendeeIdx !== -1) {
      return Object.assign(attendee, attendees[attendeeIdx]);
    }
    return attendee;
  });
  await user.save();

  console.log('attendance', user.events[eventIdx].attendance);

  return user.events[eventIdx].attendance;
};

module.exports = updateAttendees;
