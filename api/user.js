const express = require('express');
const router = express.Router();

const User = require('./../models/userModel')

const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
    let{name, email, password, dateOfBirth} = req.body;
    name = name.trim();
    email = email.trim();
    password = password.trim();
    dateOfBirth = dateOfBirth.trim();

    if(name == "" || email == "" || password == "" || dateOfBirth == ""){
        res.json({
            status: "FAILED",
            message: "Empty input fields!"
        })
    } else if (!/^[a-zA-Z ]*$/.test(name)) {
        res.json({
            status: "FAILED",
            message: "Invalid name entered"
        })
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)){
        res.json({
            status: "FAILED",
            message: "Invalid email entered"
        })
    } else if (!new Date(dateOfBirth).getTime()) {
        //date format: "mm-dd-yyyy"
        res.json({
            status: "FAILED",
            message: "Invalid date of birth entered"
        })
    } else if (password.length < 8){
        res.json({
            status: "FAILED",
            message: "Password is too short"
        })
    } else {
        User.find({email}).then(result => {
            if(result.length){
                res.json({
                    status: "FAILED",
                    message: "Usuário já existente!"
                })
            } else {
                // try to create a new user

                // password handling
                const saltRounds = 10;
                bcrypt.hash(password, saltRounds).then(hashedPassword => {
                    const newUser = new User({
                        name, 
                        email,
                        password: hashedPassword,
                        dateOfBirth
                    });

                    newUser.save().then(result => {
                        res.json({
                            status: "SUCCESS",
                            message: "Usuário criado com sucesso!",
                            data: result,
                        })
                    })
                    .catch(err => {
                        res.json({
                            status: "FAILED",
                            message: "An Error occured while hashing password!"
                        })
                    })
                })
                .catch(err => {
                    res.json({
                        status: "FAILED",
                        message: "An Error occured while hashing password!"
                    })
                })
            }
        }).catch(err => {
            console.log(err, 'oops, algo inesperado ocorreu');
            res.json({
                status: "FAILED",
                message: "Oops, algo inesperado ocorreu!"
            })
        })
    }
});

router.post('/signin', (req, res) => {
    
});

module.exports = router;