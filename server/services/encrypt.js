const Cryptr = require('cryptr');

const { server } = require('../config');

const cryptr = new Cryptr(server.secret);

const generateQRCodeKey = (eventId, attendeeEmail) => cryptr.encrypt(`${eventId}|${attendeeEmail}`);

const getQRCodeKeyData = (qrCodeKey) => {
  const [eventId, attendeeEmail] = cryptr.decrypt(qrCodeKey).split('|');
  return {
    eventId,
    attendeeEmail,
  };
};

module.exports = {
  generateQRCodeKey,
  getQRCodeKeyData,
};
