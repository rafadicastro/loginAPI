require('dotenv').config();
const mongoose = require('mongoose');
const uri = "mongodb+srv://rafaelCastro:ednairamar@cluster0.8krrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => {
    console.log("Conectado ao MongoDB Atlas com sucesso!");
    })
    .catch((err) => {
        console.log("Erro ao concectar ao MongoDB Atlas:", err);
    });
