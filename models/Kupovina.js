const mongoose = require('mongoose')
const Schema = mongoose.Schema

const KupovinaSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required: false
    },
    stavke:[{
            proizvod:{
                type: String,
                required:false
            },
            cena:{
                type: Number,
                required:false
            },
            kolicina:{
                type: Number,
                required:false
            },
            nazivOpis:{
                type: String,
                required:false
            },
            slika:[{
                type: String,
                required:false
            }]
        }
    ],
    ukupnaCena:{
        type: Number,
        required:true
    },
    napomena:{
        type: String,
        required:false
    },
    nacinIsporuke:{
        type: String,
        required:true
    },
    nacinPlacanja:{
        type: String,
        required:true
    },
    datumKupovine:{
        type: Date,
        default: Date.now
    },
    telefon: {
        type: String,
        required: false
    },
    ulica: {
        type: String,
        required: false
    },
    broj: {
        type: String,
        required: false
    },
    grad: {
        type: String,
        required: false
    },
    postanskiBroj: {
        type: String,
        required: false
    },
    firma:{
      type:String,
      required:false
    },
    pib:{
      type:String,
      required:false
    },
    ime: {
        type: String,
        required: false
    },
    prezime: {
        type: String,
        required: false
    },
    email: {
        type: String,
        required: false
    },
    vrstaLica: {
        type:String,
        required:false
    }
})

module.exports = Kupovina = mongoose.model('kupovina',KupovinaSchema)