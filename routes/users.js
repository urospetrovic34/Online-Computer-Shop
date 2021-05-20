const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const auth = require('../middleware/auth')

const User = require('../models/User')

//Registracijska putanja
router.post('/', async (req,res)=>{

    const {ime,prezime,email,password} = req.body

    try 
    {
        if(email==="" || password==="" || ime === "" || prezime==="")
        {
            return res.status(400).json({msg:'Niste popunili sva polja'})
        }

        let user = await User.findOne({email})

        if(user)
        {
            return res.status(400).json({msg:"Korisnik postoji"})
        }

        user = new User({
            ime,prezime,email,password,admin:req.body.admin,telefon:"",ulica:"",broj:"",grad:"",postanskiBroj:"",vrstaLica:"fizickoLice",firma:"",pib:""
        })

        const salt = await bcrypt.genSalt(10)

        user.password = await bcrypt.hash(password,salt)

        await user.save()

        const payload = {
            user: {
                id:user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT,
            {expiresIn:7200},
            (error,token)=>{
                
                if(error)
                {
                    throw error
                }

                res.json({token})
            }
        )
    } 
    catch (error) 
    {
        console.error(error.message);
        res.status(500).send('Serverska greska')
    }

})

//Putanja da se dohvati user nakon logovanja ili registracije
router.get('/', auth, async (req,res) => {

    console.log(req)

    try 
    {
        const user = await User.findById(mongoose.Types.ObjectId(req.user.id)).select('-password')

        res.json(user)
        console.log(user)
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).send('Serverska greska')        
    }

})

//Login putanja
router.post('/login', async (req, res) => {

    const {email,password} = req.body

    try 
    {
        if(email==="" || password==="")
        {
            return res.status(400).json({msg:'Niste popunili sva polja'})
        }

        const user = await User.findOne({email})

        if(!user)
        {
            return res.status(400).json({msg:'Korisnik ne postoji'})
        }

        const match = await bcrypt.compare(password,user.password)

        if(!match)
        {
            return res.status(400).json({msg:'Neispravni email ili šifra'})
        }

        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(
            payload,
            process.env.JWT,
            {expiresIn:7200},
            (error,token)=>{
                
                if(error)
                {
                    throw error
                }

                res.json({token})
            }
        )
    } 
    catch (error) 
    {
        res.status(500).send('Serverska greška')
    }

})

router.put('/:id', auth, async(req,res) => {

    try 
    {
        let user = await User.findById(req.params.id)

        if(!user)
        {
            return res.status(404).json({msg:'Korisnik nije pronađen'})
        }

        if(user)
        {
            user.ime = req.body.ime
            user.prezime = req.body.prezime
            user.email = req.body.email
            user.grad = req.body.grad
            user.broj = req.body.broj
            user.postanskiBroj = req.body.postanskiBroj
            user.firma = req.body.firma
            user.pib = req.body.pib
            user.ulica = req.body.ulica
            user.telefon = req.body.telefon
            user.vrstaLica = req.body.vrstaLica

            const updatedUser = await user.save()

            res.json(updatedUser)
            console.log(updatedUser)
        }
    } 
    catch (error) 
    {
        console.error(error.message)
        res.status(500).send('Serverska greška')
    }

})

module.exports = router