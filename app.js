const express = require('express');
const app = express();
const port = 3092;

const mongoose = require('mongoose');
const routerMaison = require('./Routes/routerMaison');
const connection = mongoose.connection;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const cors = require('cors');
app.use(cors());

app.use('/maison',routerMaison);

app.listen({port},()=>{
console.log("Available on port 3092");
});



//connexion a la base de donnees
mongoose.connect('mongodb+srv://teccartdb:root@cluster0.klxgv.mongodb.net/teccartdb?retryWrites=true&w=majority',{useUnifiedTopology:true, useNewUrlParser: true });
connection.once('open',()=>{
    console.log('connected to MongoDB');
});


