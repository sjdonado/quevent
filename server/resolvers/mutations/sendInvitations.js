const QRCode = require('qrcode');
const { ApolloError } = require('apollo-server');
const moment = require('moment');
const { authentication } = require('../../services/auth');
const { sendQRCodeEmail } = require('../../services/mailer');

const sendInvitations = async(parent, { eventId }, context) => {
    const user = await authentication(context);

    const eventIdx = user.events.findIndex((event) => event.id === eventId);
    if (eventIdx === -1) {
        throw new ApolloError('Event not found', 404);
    }

    const event = user.events[eventIdx];
    if (!event.active) {
        throw new ApolloError('The event is not active', 400);
    }

    await Promise.all(event.attendance.map(async(attendee) => {
        if (!attendee.invited && attendee.active && attendee.selectable) {
            //console.log('attendee', attendee);
            const url = await QRCode.toDataURL(attendee.qrCodeKey);
            const eventInfo = {
                name: event.name,
                description: event.description,
                location: event.location,
                startDate: moment(event.startDate).utcOffset(7).format('MMMM Do YYYY, h:mm a'), // LLL
                endDate: moment(event.endDate).utcOffset(7).format('MMMM Do YYYY, h:mm a'),
            };
            const res = await sendQRCodeEmail(url, user.name, eventInfo, attendee.email);

            if (res) {
                Object.assign(attendee, {
                    invited: true,
                    selectable: false,
                });
            }
        }
    }));

    await user.save();

    return event;
};

module.exports = sendInvitations;