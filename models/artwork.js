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
  //bids: [ { type: Schema.Types.ObjectId,  ref: 'Bid' } ],
  // deadline: {
  //   type: Date,
  //   required: true
  // },
  pic_path: {
    type: String,
    default: "https://theeyetravels.com/wp-content/uploads/2014/12/Beethoven-3.jpg",
    required: true
  },
}, {
  timestamps: {
    createdAt: "created_at",
    updatedAt: "updated_at"
  }
  // pic_name: {
  //   type: String,
  //   required: true
  // }
});

//mongoose virtuals
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

//create method for arworkShema
ArtworkSchema.methods.belongsTo = function(user) {
  return this._creator.equals(user._id);
};

module.exports = mongoose.model('Artwork', ArtworkSchema);
