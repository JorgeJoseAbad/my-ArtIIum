const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const TYPES = require('./artwork-types');
const moment = require('moment');

const ArtworkSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: TYPES,
    required: true
  },
  _creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  startBid: {
    type: Number,
    required: true
  },
  deadline: {
    type: Date,
    required: true
  },
  pic_path: {
    type: String,
    required: true
  },
  pic_name: {
    type: String,
    required: true
  }
});

ArtworkSchema.virtual('timeRemaining').get(function() {
  let remaining = moment(this.deadline).fromNow(true).split(' ');
  let [days, unit] = remaining;
  return {
    days,
    unit
  };
});

ArtworkSchema.virtual('inputFormattedDate').get(function() {
  return moment(this.deadline).format('DD-MM-YYYY');
});

ArtworkSchema.methods.belongsTo = function(user) {
  return this._creator.equals(user._id);
};

module.exports = mongoose.model('Artwork', ArtworkSchema);
