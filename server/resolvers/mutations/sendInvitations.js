const QRCode = require('qrcode');
const { ApolloError } = require('apollo-server');

const { authentication } = require('../../services/auth');
const { sendQRCodeEmail } = require('../../services/mailer');
const { generateQRCodeKey } = require('../../services/encrypt');

const sendInvitations = async (parent, { eventId }, context) => {
  const user = await authentication(context);

  const eventIdx = user.events.findIndex((event) => event.id === eventId);
  if (eventIdx === -1) {
    throw new ApolloError('Event not found', 404);
  }

  const event = user.events[eventIdx];

  await Promise.all(event.attendance.map(async (attendee) => {
    const url = await QRCode.toDataURL(generateQRCodeKey(event.id, attendee.id));
    // const data = url.replace(/.*,/, '');
    // const qrCode = Buffer.from(data, 'base64');

    if (attendee.invited) {
      const res = await sendQRCodeEmail(url, user.name, event.name, attendee.email);
      console.log(res);
      if (res) {
        Object.assign(attendee, { invited: true });
      }
    }
  }));

  await user.save();

  return event;
};

module.exports = sendInvitations;
