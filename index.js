// CONFIGURTAÇÃO INICIAL
require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose');




// FORMA DE LER JSON / MIDDLEWERE   
app.use(
    express.urlencoded({
        extended: true
    })
)

app.use(express.json())

// ROTAS DA API
const personRoutes = require('./routes/personRoutes')
app.use('/person',personRoutes)




//CONEXAO COM O BANCO
const DB_USER = process.env.DB_USER
const DB_PASWWORD = process.env.DB_PASWWORD

mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASWWORD}@api-node-mongoose.gz1mb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(() =>{
    console.log("Conexao efetuada com sucesso");
    app.listen(3000)
})
.catch(err => console.log(err))


//ROTA INICIAL / ENDPOINT
app.get('/', (req, res) => {
    res.json({message: "Servidor rodando"})
})



// 