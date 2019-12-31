const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');

const updateAttendee = async(parent, args, context) => {
    const {
        eventId,
        attendeeId,
        active,
        attended,
        invited,
        selectable,
    } = args;

    const user = await authentication(context);

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
        active: active || attendee.active,
        attended: attended || attendee.attended,
        selectable: selectable || attendee.selectable,
    });

    await user.save();
    return user.events[eventIdx].attendance[attendeeIdx];
};

module.exports = updateAttendee;