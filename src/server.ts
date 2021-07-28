import 'reflect-metadata';

import express, { json } from "express"
import { createServer } from 'http'
import cors from 'cors'
import socketIo from 'socket.io'

import routes from './routes'

import './types/method-override'
import './database/connect'

const app = express()
const server = createServer(app)
const io = new socketIo.Server(server)
const PORT = 8100

const connectedUsers = <any>[];

let port = process.env.PORT || PORT;

app.use(cors())
app.use(json())    
app.use((request, response, next) => {
  request.io = io
  next()
})
app.use(routes)

io.on('connection', function (socket) {
  
  socket.on('joinClassroom', ({ classroom }) => {
    socket.join(classroom)
    console.log(socket.id + ' -> Join to ' + classroom)
  })

  socket.on('message', ({ message, classroom }) => {
    socket.broadcast.to(classroom).emit('Message', message)
  })

  console.log('client connect...', socket.id);

  socket.on('disconnect', function () {
    console.log('client disconnect...', socket.id)
    delete connectedUsers[socket.id]
  })

  socket.on('error', function (err) {
    console.log('received error from client:', socket.id)
    console.log(err)
  })
})

server.listen(port, function () {
    console.log(`server running in" + ${port}`);
});