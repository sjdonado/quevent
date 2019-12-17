const mongoose = require('mongoose');

const { Schema } = mongoose;
const { eventSchema } = require('./Event');

const fields = {
  name: {
    type: String,
    required: [true, 'Name required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Email required'],
  },
  profilePicture: String,
  active: {
    type: Boolean,
    default: true,
  },
  events: {
    type: [eventSchema],
    default: null,
  },
};

const userSchema = new Schema(fields, {
  timestamps: true,
});

userSchema.methods.toJSON = function toJSON() {
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

userSchema.methods.getId = function toJSON() {
  const doc = this.toObject();
  // eslint-disable-next-line no-underscore-dangle
  return doc._id;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
