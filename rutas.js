const  express = require('express')
const routes = express.Router()


//READ
routes.get('/get/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM articulos', (err, rows)=>{
            if(err) return res.send(err)

            res.json(rows)
        })
    })
})

//READ ESPECÍFICO

//CREATE
routes.post('/post/', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('INSERT INTO articulos set ?',[req.body], (err, rows)=>{
            if(err) return res.send(err)

            res.json('Articulo insertado con éxito.')
        })
    })
})

//UPDATE
routes.put('/put/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        
        conn.query('UPDATE articulos set ? WHERE idarticulos = ?',[req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json('Articulo actualizado.')
        })
    })
})

//DELETE
routes.delete('/delete/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        
        conn.query('DELETE FROM articulos WHERE idarticulos = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.json('Articulo eliminado con éxito.')
        })
    })
})

module.exports = routes 