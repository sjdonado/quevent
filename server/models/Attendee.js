const mongoose = require('mongoose');

const { Schema } = mongoose;

const fields = {
  email: {
    type: String,
  },
  qrCodeKey: {
    type: String,
    unique: true,
    sparse: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  attended: {
    type: Boolean,
    default: false,
  },
  invited: {
    type: Boolean,
    default: false,
  },
};

const attendeeSchema = new Schema(fields, {
  timestamps: true,
});

attendeeSchema.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  // eslint-disable-next-line no-underscore-dangle
  // eslint-disable-next-line dot-notation
  delete doc['__v'];
  // delete doc.createdAt;
  // delete doc.updatedAt;
  return doc;
};

attendeeSchema.methods.getId = function getId() {
  const doc = this.toObject();
  // eslint-disable-next-line no-underscore-dangle
  return doc._id.toString();
};

// const Attendee = mongoose.model('Attendee', attendeeSchema);

module.exports = {
  // Attendee,
  attendeeSchema,
};
