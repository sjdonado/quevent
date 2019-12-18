const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');
const { getQRCodeKeyData } = require('../../services/encrypt');

const readInvitation = async (parent, { qrCodeKey }, context) => {
  const user = await authentication(context);
  const { eventId, attendeeEmail } = getQRCodeKeyData(qrCodeKey);

  const eventIdx = user.events.findIndex(({ id }) => id === eventId);
  if (eventIdx === -1) {
    throw new ApolloError('Event not found', 404);
  }

  const event = user.events[eventIdx];
  if (!event.active) {
    throw new ApolloError('The event is not active', 400);
  }

  const attendeeIdx = event.attendance.findIndex(({ email }) => email === attendeeEmail);
  if (attendeeIdx === -1) {
    throw new ApolloError('Attendee not found', 404);
  }

  const attendee = event.attendance[attendeeIdx];
  if (!attendee.active) {
    throw new ApolloError('Attendee is not active', 401);
  }

  Object.assign(attendee, {
    attended: true,
  });

  await user.save();

  return attendee;
};

module.exports = readInvitation;
