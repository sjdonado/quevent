const mongoose = require('mongoose');

const { attendeeSchema } = require('./Attendee');

const { Schema } = mongoose;

const fields = {
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  startDate: {
    type: Date,
    required: [true, 'Start date required'],
  },
  endDate: {
    type: Date,
    required: [true, 'Start date required'],
  },
  active: {
    type: Boolean,
    default: true,
  },
  author: {
    type: String,
  },
  attendance: [attendeeSchema],
};

const eventSchema = new Schema(fields, {
  timestamps: true,
});

eventSchema.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  // eslint-disable-next-line no-underscore-dangle
  doc.id = doc._id;
  // eslint-disable-next-line no-underscore-dangle
  delete doc._id;
  // eslint-disable-next-line dot-notation
  delete doc['__v'];
  // delete doc.createdAt;
  // delete doc.updatedAt;
  return doc;
};

eventSchema.methods.getId = function toJSON() {
  const doc = this.toObject();
  // eslint-disable-next-line no-underscore-dangle
  return doc._id;
};

// const Event = mongoose.model('Event', eventSchema);

module.exports = {
  // Event,
  eventSchema,
};
