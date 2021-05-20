const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const auth = require('../middleware/auth')
const checkObjectId = require('../middleware/checkObjectId')
const Proizvod = require('../models/Proizvod')
const {Storage} = require('@google-cloud/storage')
const upload = require('../middleware/multer')
const {format} = require('util')
const { v4: uuid } = require("uuid")

router.get('/', async (req,res) => {

    try 
    {
        const data = await Proizvod.find()

        const popust = await Proizvod.find().sort({'_id':-1}).limit(6)
        const najnovije = await Proizvod.find().sort({'datum':-1}).limit(6)
        const topOcena = await Proizvod.find().sort({'recenzije.ocena':-1}).limit(6)

        res.json({data,popust,najnovije,topOcena})
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greška')
    }

})

router.get('/query', async (req,res) => {

    let query = {}
    let sort = {}
    let vrstaRobe = {}
    let strana = 1

    for(let i in req.query)
    {
        if(i!==undefined)
        {
            if(i!=='brojStrane' && i!=='sortBy' && i!=='orderBy' && i!=='cenaDo' && i!=='cenaOd')
            {
                if(i==='cena')
                {
                    query[i]=Number(JSON.parse(req.query[i]))
                }
                else
                {
                    query[i]=String(JSON.parse(req.query[i])) 
                }
            }
            if(i==='cenaDo' || i==='cenaOd')
            {
                query['cena']={$gte:Number(JSON.parse(req.query['cenaOd'])),$lte:Number(JSON.parse(req.query['cenaDo'])),}
            }
            if(i==='vrstaRobe')
            {
                query['vrstaRobe']=String(JSON.parse(req.query.vrstaRobe))
            }
        }
    }

    for(let i in req.query)
    {
        if(i!==undefined)
        {
            if(i==='orderBy' || i==='sortBy')
            {
                sort[String(JSON.parse(req.query.orderBy))]=Number(JSON.parse(req.query.sortBy))
            }
        }
    }

    for(let i in req.query)
    {
        if(i!==undefined)
        {
            if(i==='vrstaRobe')
            {
                vrstaRobe['vrstaRobe']=String(JSON.parse(req.query.vrstaRobe))
            }
        }
    }

    for(let i in req.query)
    {
        if(i!==undefined)
        {
            if(i==='brojStrane')
            {
                strana = Number(JSON.parse(req.query.brojStrane))
            }
        }
    }

    let stranaSize = 18

    const filter = await Proizvod.find(vrstaRobe)
    const proizvodi = await Proizvod.find(query).sort(sort).limit(stranaSize).skip(stranaSize * (strana - 1))
    const proizvodiStrane = Math.round((await Proizvod.find(query).countDocuments())/18)

    res.json({strana,filter,proizvodi,proizvodiStrane})
})

router.get('/:id', async (req,res) => {

    try 
    {
        const proizvod = await Proizvod.findById(req.params.id)

        if(!proizvod)
        {
            return res.status(404).json({msg:'Proizvod nije pronađen'})
        }

        res.json(proizvod)
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greska')
    }

})

const storage = new Storage({
    projectId:process.env.GOOGLE_PROJECT_ID,
    keyFileName:process.env.GOOGLE_APPLICATION_CREDENTIALS
})

const bucket = storage.bucket(process.env.GOOGLE_BUCKET_PATH)

const imageUpload = (fajl) => {
    return new Promise((resolve,reject) => {

        if(!fajl)
        {
            reject("No file")
        }

        let newName = `${fajl.originalname}_${Date.now()}`
    
        let fileUpload = bucket.file(newName)

        let niz = []
    
        const blobStream = fileUpload.createWriteStream({
            metadata:{
                contentType: fajl.mimetype,
                metadata:{
                    firebaseStorageDownloadTokens:uuid()
                }
            }
        })
    
        blobStream.on('error',(error) => {
            reject("Error")
            console.error(error.message)
        })
    
        blobStream.on('finish',() => {
            fileUpload.getSignedUrl({action:'read',expires:'01-01-2999'},function(error,url){
                resolve(url)
            })
        })
    
        blobStream.end(fajl.buffer)
    })
}

router.post('/',/*auth,*/upload.array('photoFiles',8),async(req,res)=>{
    try {

        console.log(req.body)

        const nizFajlova = req.files

        const niz = []

        if(nizFajlova)
        {
            for(let i=0;i<nizFajlova.length;i++)
            {
                let a = await imageUpload(nizFajlova[i])
                niz.push(a)
            }
        }

        const newProizvod = new Proizvod({
            slike:niz,
            eanKod:req.body.eanKod,
            nazivOpis:req.body.nazivOpis,
            proizvodjac:req.body.proizvodjac,
            model:req.body.model,
            sifra:req.body.sifra,
            vrstaRobe:req.body.vrstaRobe,
            zemljaPoreklo:req.body.zemljaPoreklo,
            cena:req.body.cena,
            cenaPopust:req.body.cenaPopust,
            recenzije:[{"komentar":"","ocena":""}],
            podnozje:req.body.podnozje,
            tipProcesora:req.body.tipProcesora,
            brojJezgara:req.body.brojJezgara,
            niti:req.body.niti,
            tehnologijaIzrade:req.body.tehnologijaIzrade,
            tdp:req.body.tdp,
            radnaFrekvencija:req.body.radnaFrekvencija,
            turboFrekvencija:req.body.turboFrekvencija,
            l2KesMemorija:req.body.l2KesMemorija,
            l3KesMemorija:req.body.l3KesMemorija,
            integrisaniGpu:req.body.integrisaniGpu,
            proizvodjacCipa:req.body.proizvodjacCipa,
            magistralaMemorije:req.body.magistralaMemorije,
            kolicinaMemorije:req.body.kolicinaMemorije,
            tipMemorije:req.body.tipMemorije,
            interfejs:req.body.interfejs,
            brzinaMemorije:req.body.brzinaMemorije,
            brzinaGpu:req.body.brzinaGpu,
            hladjenje:req.body.hladjenje,
            dvi:req.body.dvi,
            vga:req.body.vga,
            hdmi:req.body.hdmi,
            dimenzije:req.body.dimenzije,
            debljina:req.body.debljina,
            masa:req.body.masa,
            kapacitet:req.body.kapacitet,
            maksimalnaFrekvencija:req.body.maksimalnaFrekvencija,
            tipRam:req.body.tipRam,
            voltaza:req.body.voltaza,
            latencija:req.body.latencija,
            izlaznaSnaga:req.body.izlaznaSnaga,
            tipNapajanja:req.body.tipNapajanja,
            oblikNapajanja:req.body.oblikNapajanja,
            standardNapajanja:req.body.standardNapajanja,
            efikasnost:req.body.efikasnost,
            pciPin:req.body.pciPin,
            sataPin:req.body.sataPin,
            dvadesetPin:req.body.dvadesetPin,
            epsPin:req.body.epsPin,
            pfc:req.body.pfc,
            ovp:req.body.ovp,
            opp:req.body.opp,
            scp:req.body.scp,
            precnikVentilatora:req.body.precnikVentilatora,
            formatPloce:req.body.formatPloce,
            podrzaniProcesori:req.body.podrzaniProcesori,
            podrzanaMemorija:req.body.podrzanaMemorija,
            memorijaPloce:req.body.memorijaPloce,
            mreznaKarta:req.body.mreznaKarta,
            zvucnaKarta:req.body.zvucnaKarta,
            podnozjePloce:req.body.podnozjePloce,
            cipset:req.body.cipset,
            skladiste:req.body.skladiste,
            slotoviZaProsirenje:req.body.slotoviZaProsirenje,
            kapacitetDiska:req.body.kapacitetDiska,
            formatDiska:req.body.formatDiska,
            brzinaCitanja:req.body.brzinaCitanja,
            brzinaPisanja:req.body.brzinaPisanja,
            nandFlashMemorija:req.body.nandFlashMemorija,
            kontroler:req.body.kontroler,
            brojObrtaja:req.body.brojObrtaja,
            bufferDiska:req.body.bufferDiska,
            konekcijaDiska:req.body.konekcijaDiska,
            tipHdd:req.body.tipHdd
        })

        const proizvod = await newProizvod.save()

        res.json(proizvod)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('Serverska greška')
    }
})

router.put('/:id', auth, checkObjectId('id'), async(req,res) => {

    try 
    {
        let proizvod = await Proizvod.findById(req.params.id)

        if(!proizvod)
        {
            return res.status(404).json({msg:'Proizvod nije pronađen'})
        }

        proizvod = await Proizvod.findOneAndUpdate({_id:req.params.id},req.body,{new:true,runValidators:true})

        res.json({success:true})
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greška')
    }

})

router.delete('/:id', /*auth,*/ checkObjectId('id'), async(req,res) => {

    try 
    {
        const proizvod = await Proizvod.findById(req.params.id)

        if(!proizvod)
        {
            return res.status(404).json({msg:'Proizvod nije pronađen'})
        }

        await proizvod.remove()

        res.json({success:true})
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greška')
    }

})

module.exports = router