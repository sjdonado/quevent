const login = require('./login');
const createEvent = require('./createEvent');
const updateEvent = require('./updateEvent');
const updateEvents = require('./updateEvents');
const addAttendees = require('./addAttendees');
const updateAttendee = require('./updateAttendee');
const updateAttendees = require('./updateAttendees');
const sendInvitations = require('./sendInvitations');
const readInvitation = require('./readInvitation');


module.exports = {
  login,
  createEvent,
  updateEvent,
  updateEvents,
  addAttendees,
  updateAttendee,
  updateAttendees,
  sendInvitations,
  readInvitation,
};
