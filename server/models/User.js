const mongoose = require('mongoose');

const { Schema } = mongoose;

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
  profilePicture: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
  },
  attended: {
    type: Boolean,
    default: false,
  },
};

const user = new Schema(fields, {
  timestamps: true,
});

user.methods.toJSON = function toJSON() {
  const doc = this.toObject();
  // eslint-disable-next-line no-underscore-dangle
  doc.id = doc._id;
  delete doc.password;
  // eslint-disable-next-line no-underscore-dangle
  delete doc._id;
  // eslint-disable-next-line dot-notation
  delete doc['__v'];
  // delete doc.createdAt;
  // delete doc.updatedAt;
  return doc;
};

user.methods.getId = function toJSON() {
  const doc = this.toObject();
  // eslint-disable-next-line dot-notation
  return doc['_id'];
};

const User = mongoose.model('User', user);

module.exports = {
  User,
};
