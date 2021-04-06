//const app = require('express')()
// const http = require('http').createServer(app)


// app.get('/', (req, res) => {
//     res.send("Node Server is running. Yay!!")
// })

// //Socket Logic
// const socketio = require('socket.io')(http)

// socketio.on("connection", function(userSocket){
//   console.log("connecter");
//     userSocket.on("send_message", (data) => {
//         userSocket.broadcast.emit("receive_message", data)
//     })
// })

// http.listen(3000)

const app = require ( 'express' ) (); 
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.get('/',function(req,resp){

resp.send('Bonjour mon trés cher flutter');
  console.log('utilisateur flutter connecter');
})
io.on('connection', function (client) {

  console.log('client connect...', client.id);

  client.on('typing', function name(data) {
    console.log(data);
    io.emit('typing', data)
  })

  client.on('message', function name(data) {
    console.log(data);
    io.emit('message', data)
  })

  client.on('location', function name(data) {
    console.log(data);
    io.emit('location', data);
  })

  client.on('connect', function () {
  })

  client.on('disconnect', function () {
    console.log('client disconnect...', client.id)
    // handleDisconnect()
  })

  client.on('error', function (err) {
    console.log('received error from client:', client.id)
    console.log(err)
  })
})

var server_port = process.env.PORT || 3000;
server.listen(server_port, function (err) {
  if (err) throw err
  console.log('le serveur est demarrer Listening on port %d', server_port);
});