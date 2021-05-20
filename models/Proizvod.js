const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProizvodSchema = new Schema({
    slike:[{
        type:String
    }],
    eanKod:{
        type:String,
        required: true
    },
    nazivOpis:{
        type:String,
        required: true
    },
    proizvodjac:{
        type:String,
        required: true
    },
    naLageru:{
        type:Number,
        default:20
    },
    model:{
        type:String,
        required: true
    },
    vrstaRobe:{
        type:String,
        required: true
    },
    zemljaPoreklo:{
        type:String,
        required: true,
        default:"N.R. Kina"
    },
    cena:{
        type:Number,
        required: true
    },
    cenaPopust:{
        type:Number,
        required: false
    },
    recenzije:[{
        komentar:{
            type: String,
            required:false
        },
        ocena:{
            type: Number,
            required:false
        }
    }],
    podnozje:{
        type:String,
        required: false
    },
    tipProcesora:{
        type:String,
        required: false
    },
    brojJezgara:{
        type:String,
        required: false
    },
    niti:{
        type:String,
        required: false
    },
    tehnologijaIzrade:{
        type:String,
        required: false
    },
    tdp:{
        type:String,
        required: false
    },
    radnaFrekvencija:{
        type:String,
        required: false
    },
    turboFrekvencija:{
        type:String,
        required: false
    },
    l2KesMemorija:{
        type:String,
        required: false
    },
    l3KesMemorija:{
        type:String,
        required: false
    },
    integrisaniGpu:{
        type:String,
        required: false
    },
    proizvodjacCipa:{
        type:String,
        required: false
    },
    gpu:{
        type:String,
        required: false
    },
    magistralaMemorije:{
        type:String,
        required: false
    },
    kolicinaMemorije:{
        type:String,
        required: false
    },
    tipMemorije:{
        type:String,
        required: false
    },
    interfejs:{
        type:String,
        required: false
    },
    brzinaMemorije:{
        type:String,
        required: false
    },
    brzinaGpu:{
        type:String,
        required: false
    },
    hladjenje:{
        type:String,
        required: false
    },
    dvi:{
        type:String,
        required: false
    },
    vga:{
        type:String,
        required: false
    },
    hdmi:{
        type:String,
        required: false
    },
    dimenzije:{
        type:String,
        required: false
    },
    debljina:{
        type:String,
        required: false
    },
    masa:{
        type:String,
        required: false
    },
    kapacitet:{
        type:String,
        required: false
    },
    maksimalnaFrekvencija:{
        type:String,
        required: false
    },
    tipRam:{
        type:String,
        required: false
    },
    voltaza:{
        type:String,
        required: false
    },
    latencija:{
        type:String,
        required: false
    },
    izlaznaSnaga:{
        type:String,
        required: false
    },
    tipNapajanja:{
        type:String,
        required: false
    },
    oblikNapajanja:{
        type:String,
        required: false
    },
    standardNapajanja:{
        type:String,
        required: false
    },
    efikasnost:{
        type:String,
        required: false    
    },
    pciPin:{
        type:String,
        required: false
    },
    sataPin:{
        type:String,
        required: false
    },
    dvadesetPin:{
        type:String,
        required: false
    },
    epsPin:{
        type:String,
        required: false
    },
    pfc:{
        type:String,
        required: false
    },
    ovp:{
        type:String,
        required: false
    },
    opp:{
        type:String,
        required: false
    },
    scp:{
        type:String,
        required: false
    },
    precnikVentilatora:{
        type:String,
        required: false
    },
    formatPloce:{
        type:String,
        required: false
    },
    podrzaniProcesori:{
        type:String,
        required: false
    },
    podrzanaMemorija:{
        type:String,
        required: false
    },
    memorijaPloce:{
        type:String,
        required: false
    },
    mreznaKarta:{
        type:String,
        required: false
    },
    zvucnaKarta:{
        type:String,
        required: false
    },
    podnozjePloce:{
        type:String,
        required: false
    },
    cipset:{
        type:String,
        required: false
    },
    skladiste:{
        type:String,
        required: false
    },
    slotoviZaProsirenje:{
        type:String,
        required: false
    },
    kapacitetDiska:{
        type:String,
        required: false
    },
    formatDiska:{
        type:String,
        required: false
    },
    brzinaCitanja:{
        type:String,
        required: false
    },
    brzinaPisanja:{
        type:String,
        required: false
    },
    nandFlashMemorija:{
        type:String,
        required: false
    },
    kontroler:{
        type:String,
        required: false
    },
    brojObrtaja:{
        type:String,
        required: false
    },
    bufferDiska:{
        type:String,
        required: false
    },
    konekcijaDiska:{
        type:String,
        required: false
    },
    tipHdd:{
        type:String,
        required: false
    },
    tipKucista:{
        type:String,
        required: false
    },
    kompatabilnostKucista:{
        type:String,
        required: false
    },
    hladjenjeKucista:{
        type:String,
        required: false
    },
    leziste525:{
        type:String,
        required: false
    },
    leziste35:{
        type:String,
        required: false
    },
    leziste25:{
        type:String,
        required: false
    },
    maxDuzinaGpu:{
        type:String,
        required: false
    },
    maxVisinaCpu:{
        type:String,
        required: false
    },
    mestaPci:{
        type:String,
        required: false
    },
    boja:{
        type:String,
        required: false
    },
    datum: {
        type: Date,
        default: Date.now
    },
})

module.exports = Proizvod = mongoose.model('proizvod',ProizvodSchema)