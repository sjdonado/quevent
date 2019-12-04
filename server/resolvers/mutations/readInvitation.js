const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');
const { getQRCodeKeyData } = require('../../services/encrypt');

const readInvitation = async (parent, { qrCodeKey }, context) => {
  const user = await authentication(context);
  const { eventId, attendeeId } = getQRCodeKeyData(qrCodeKey);

  const eventIdx = user.events.findIndex(({ id }) => id === eventId);
  if (eventIdx === -1) {
    throw new ApolloError('Event not found', 404);
  }

  const attendeeIdx = user.events[eventIdx].attendance.findIndex(({ id }) => id === attendeeId);
  if (attendeeIdx === -1) {
    throw new ApolloError('Attendee not found', 404);
  }

  const attendee = user.events[eventIdx].attendance[attendeeIdx];

  user.events[eventIdx].attendance[attendeeIdx] = Object.assign(attendee, {
    invited: true,
  });

  await user.save();

  return user.events[eventIdx].attendance[attendeeIdx];
};

module.exports = readInvitation;