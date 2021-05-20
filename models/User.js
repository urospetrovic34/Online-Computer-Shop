const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Razlog zasto se zove user a ne korisnik je zbog registracije i logina, nece da prepoznaje u findById metodi ako se zove korisnik...

const UserSchema = new Schema({
    ime: {
        type: String,
        required: true
    },
    prezime: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
      },
    password: {
        type: String,
        required: true
      },
    dateCreatedAt: {
        type: Date,
        default: Date.now
      },
    admin:{
        type: Boolean,
        required: true,
        default: false
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
    vrstaLica:{
      type:String,
      required:false
    }
})

module.exports = User = mongoose.model('user',UserSchema)