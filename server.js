const express = require('express')
const myconn = require('express-myconnection')
const mysql = require('mysql2')
const rutas = require('./rutas')
const cors = require('cors')


const app = express()
app.set('port', process.env.PORT || 3000)
const dbOptions = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '180317Fm',
    database: 'pedidos'
}

//MIDDELAWARE
app.use(myconn(mysql, dbOptions, 'single'))
app.use(express.json())
app.use(cors())

//COMPROBAMOS QUE LA API SÍ ESTÉ RECIBIENDO
app.get('/', (req, res)=>{
    res.send('API encendida')
})

app.use('/api', rutas)
//ESCUCHANDO EL SERVER
app.listen(app.get('port'), ()=>{
    console.log('Servidor escuchando en: ', app.get('port'))
})