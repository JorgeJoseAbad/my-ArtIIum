/* Esquema oferta */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const STATEOFFERS_TAGS = [
  "On Sale",  //a la venta
  "sale_in_revue", //comprado a la espera confirmacion pago
  "selled", //comprada y pagada
];

const offerSchema = new Schema({
  artist_id:   {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true, //indice relacional vendedor
  },
  buyer_id:    {
    type: Schema.Types.ObjectId, //indice relacional comprador
    ref: 'User',
    required: true
  },
  artworkTittle: {
             type: String,
           }, // se rellena con el Tittle de artworkSchema
  artist_name: {
             type: String,
           }, //se rellena con  userName del artist_id
  price: {
          type: Number,
          required: [true, 'Please enter the artwork\'s price'],
          min: [0, 'Price can\'t be negative']
        },
  offerState: {
          type: String,
          enum: STATEOFFERS_TAGS,

        }

});

const Offer = mongoose.model('Offer',offerSchema);
module.exports = Offer;
