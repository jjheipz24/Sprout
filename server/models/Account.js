const crypto = require('crypto');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let AccountModel = {};

const PlantSchema = new mongoose.Schema({
  plantType: { type: String },
  growthStage: { type: Number, default: 0 },
  location: { type: String },
  prompt: { type: String },
  messages: { type: Array, default: [] },
  allowedUsers: { type: Array, default: [] },
});

// Schema to define user accounts 
const AccountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
    required: 'Username is required',
    match: [/^[A-Za-z0-9_\-.]{1,16}$/, 'Please fill a valid username']
  },
  friends: { type: Array, default: [] }, //will eventually be - friends: [FriendsSchema] 
  plants: [PlantSchema],
});

AccountSchema.statics.toAPI = doc => ({
  username: doc.username,
  _id: doc._id,
});


/* possibly expand on this for user/friend search */
AccountSchema.statics.findByUsername = (name, callback) => {
  const search = {
    username: name,
  };

  return AccountModel.findOne(search, callback);
};


// validate username and password
AccountSchema.statics.authenticate = (username, callback) =>
AccountModel.findByUsername(username, (err, doc) => {
  if (err) {
    return callback(err);
  }

  if (!doc) {
    return callback();
  }

  return callback(null, doc);
});

AccountSchema.statics.findRandomGardens = (name, callback) => AccountModel.find({ username: { $not: { $eq: name } } })
  .select('username plants')
  .limit(3)
  .toArray()
  .exec(callback);

AccountSchema.statics.findAllGardens = (name, callback) => AccountModel.find({ username: { $not: { $eq: name } } })
  .select('username plants')
  .toArray()
  .exec(callback);

AccountModel = mongoose.model('Account', AccountSchema);

module.exports.AccountModel = AccountModel;
module.exports.AccountSchema = AccountSchema;
