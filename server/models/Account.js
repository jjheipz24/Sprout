const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let AccountModel = {};
const iterations = 10000;
const saltLength = 64;
const keyLength = 64;

const PlantSchema = new mongoose.Schema({
  plantType: { type: String },
  growthStage: { type: Number },
  messages: { type: Array },
  allowedUsers: { type: Array },
});

// Schema to define user accounts 
const AccountSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  salt: { type: Buffer, required: true },
  password: { type: String, required: true },
  createdDate: { type: Date, default: Date.now },
  friends: { type: Array, default: [] }, //will eventually be - friends: [FriendsSchema] 
  plants: [PlantSchema],
});

AccountSchema.statics.toAPI = doc => ({
  email: doc.email,
  _id: doc._id,
  plants: doc.plants,
});

const validatePassword = (doc, password, callback) => {
  const pass = doc.password;

  return crypto.pbkdf2(password, doc.salt, iterations, keyLength, 'RSA-SHA512', (err, hash) => {
    if (hash.toString('hex') !== pass) {
      return callback(false);
    }
    return callback(true);
  });
};

/* possibly expand on this for user/friend search */
AccountSchema.statics.findByEmail = (name, callback) => {
  const search = {
    email: name,
  };

  return AccountModel.findOne(search, callback);
};

// encrypt password
AccountSchema.statics.generateHash = (password, callback) => {
  const salt = crypto.randomBytes(saltLength);

  crypto.pbkdf2(password, salt, iterations, keyLength, 'RSA-SHA512', (err, hash) =>
    callback(salt, hash.toString('hex'))
  );
};

// validate email and password
AccountSchema.statics.authenticate = (email, password, callback) =>
AccountModel.findByemail(email, (err, doc) => {
  if (err) {
    return callback(err);
  }

  if (!doc) {
    return callback();
  }

  return validatePassword(doc, password, (result) => {
    if (result === true) {
      return callback(null, doc);
    }

    return callback();
  });
});

AccountModel = mongoose.model('Account', AccountSchema);

module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;
