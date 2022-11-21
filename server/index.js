require("dotenv").config()
const express = require('express')
const sequelize = require("./db")
const models = require("./models/models")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const router = require("./routes/index")
const errorHandler = require("./middleware/ErrorHandlingMiddleware")
const path = require('path')

const PORT = process.env.PORT || 4200

/* let corsOptions = {
    origin : ['http://localhost:3000'],
} */

/* const localtunnel = require('localtunnel');

(async () => {
  const tunnel = await localtunnel({ port: 4200 });
  console.log(tunnel.url)

  tunnel.on('close', () => {
    // tunnels are closed
  });
})(); */

const app = express()
//app.use(cors(corsOptions))
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload())
app.use('/api', router)

app.use(errorHandler)

app.get('/', (req,res)=>{
    res.status(200).json({message:"it's working"})
})
const start = async()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>console.log(`server started listening on ${PORT}`))
    } catch (e){
        console.log(e)
    }
}

start()