const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const Kupovina = require('../models/Kupovina')

router.post('/',async(req,res)=>{
    try {

        console.log(req.body.stavke[0])

        const niz = []

        for(let i=0;i<req.body.stavke.length;i++){
            let a = {
                'proizvod':req.body.stavke[i].proizvod,
                'nazivOpis':req.body.stavke[i].nazivOpis,
                'slika':req.body.stavke[i].slika,
                'cena':req.body.stavke[i].cena,
                'kolicina':req.body.stavke[i].kolicina
            }
            niz.push(a)
        }

        if(req.body.user!=="")
        {
            const newKupovina = new Kupovina({
                stavke:niz,
                ukupnaCena:req.body.ukupnaCena,
                napomena:req.body.napomena,
                nacinPlacanja:req.body.nacinPlacanja,
                nacinIsporuke:req.body.nacinIsporuke,
                vrstaLica:req.body.vrstaLica,
                pib:req.body.pib,
                firma:req.body.firma,
                postanskiBroj:req.body.postanskiBroj,
                broj:req.body.broj,
                ulica:req.body.ulica,
                grad:req.body.grad,
                email:req.body.email,
                telefon:req.body.telefon,
                prezime:req.body.prezime,
                ime:req.body.ime,
                user:req.body.user
            })
    
            newKupovina.save()
    
            res.json({success:true})
        }
        else
        {
            const newKupovina = new Kupovina({
                stavke:niz,
                ukupnaCena:req.body.ukupnaCena,
                napomena:req.body.napomena,
                nacinPlacanja:req.body.nacinPlacanja,
                nacinIsporuke:req.body.nacinIsporuke,
                vrstaLica:req.body.vrstaLica,
                pib:req.body.pib,
                firma:req.body.firma,
                postanskiBroj:req.body.postanskiBroj,
                broj:req.body.broj,
                ulica:req.body.ulica,
                grad:req.body.grad,
                email:req.body.email,
                telefon:req.body.telefon,
                prezime:req.body.prezime,
                ime:req.body.ime
            })
    
            newKupovina.save()
    
            res.json({success:true})
        }
        

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Serverska greška')
    }
})

module.exports = router