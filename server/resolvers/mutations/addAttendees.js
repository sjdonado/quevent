const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');
const { generateQRCodeKey } = require('../../services/encrypt');

const addAttendee = async (parent, { eventId, attendees }, context) => {
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
    attendance: attendees.map((attendee) => Object.assign(attendee, {
      qrCodeKey: generateQRCodeKey(event.id, attendee.email),
    })),
  });

  await user.save();

  return event.attendance;
};

module.exports = addAttendee;
