const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');

const { mailer } = require('../config');

const transport = nodemailer.createTransport(sgTransport({
  auth: {
    api_key: mailer.apiKey,
  },
}));

const sendQRCodeEmail = (qrCode, author, eventName, to) => transport.sendMail({
  from: 'info@quevent.com',
  to,
  subject: 'Quevent invitation',
  html: `${author} invited you to ${eventName}. <br/> To enter the event you need to show the following QR code: <br/> <img src="cid:qrcCodecid" />`,
  attachments: [
    {
      cid: 'qrcCodecid',
      filename: 'qrCode.jpg',
      content: qrCode.split('base64,')[1],
      encoding: 'base64',
    },
  ],
});


module.exports = {
  sendQRCodeEmail,
};
