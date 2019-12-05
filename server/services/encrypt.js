const Cryptr = require('cryptr');

const { server } = require('../config');

const cryptr = new Cryptr(server.secret);

const generateQRCodeKey = (eventId, attendeeId) => cryptr.encrypt(`${eventId}|${attendeeId}`);

const getQRCodeKeyData = (qrCodeKey) => {
  const [eventId, attendeeId] = cryptr.decrypt(qrCodeKey).split('|');
  return {
    eventId,
    attendeeId,
  };
};

module.exports = {
  generateQRCodeKey,
  getQRCodeKeyData,
};
