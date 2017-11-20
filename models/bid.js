const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BidSchema = new Schema({

  amount     : { type: Number, required: true, min: 0 },
  bidder    :  { type: Schema.Types.ObjectId,  ref: 'User' }

});

module.exports = mongoose.model('Bid', BidSchema);
