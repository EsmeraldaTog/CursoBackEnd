const express = require ('express')
const handlebars= require ('express-handlebars')
const { Server}= require('socket.io')
const router= require('./router')



const PORT= 3000
const app= express()


app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'))
//configuracion de handlebars
app.engine('handlebars',handlebars.engine())
app.set('views',__dirname + '/views')

router(app)

const httpServer= app.listen(PORT,() =>{
    console.log(`Server running at Port ${PORT}`);
})

global.io = new Server(httpServer);


io.on('connection', socket => {
    console.log(`New client with id ${socket.id}`);

    socket.on('statusProductsList', data => {
        console.log(data);
    })

    socket.on('disconnect', () => {
        console.log('socket disconnected');
      });
});