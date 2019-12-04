const { authentication } = require('../../services/auth');

const updateAttendee = async (parent, { eventId, attendeeId, active, attended }, context) => {
  const user = await authentication(context);

  const eventIdx = user.events.findIndex(({ id }) => id === eventId);
  const attendeeIdx = user.events[eventIdx].attendance.findIndex(({ id }) => id === attendeeId);
  const attendee = user.events[eventIdx].attendance[attendeeIdx];

  user.events[eventIdx].attendance[attendeeIdx] = Object.assign(attendee, {
    active: active || attendee.active,
    attended: attended || attendee.attended,
  });

  await user.save();

  return user.events[eventIdx].attendance[attendeeIdx];
};

module.exports = updateAttendee;
