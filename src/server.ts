import 'reflect-metadata';

import express, { json } from "express"
import http from 'http'
import cors from 'cors'
import SocketIO, { Socket } from 'socket.io'

import routes from './routes'

import './types/method-override'
import './database/connect'

const app = express()
const server = http.createServer(app)
const io = new SocketIO(server)
const PORT = 8100

const connectedUsers = <any>[];

const sockets = <any>[];

let port = process.env.PORT || PORT;

app.use(cors())
app.use(json())    
app.use((request, response, next) => {
  request.io = io
  next()
})
app.use(routes)

app.get('/',(req, res) => res.sendFile(__dirname + '/public/index.html'));

io.on('connection', (socket: Socket) => {
  
  socket.on('joinChat', ({ chat }) => {
    socket.join(chat)
    console.log(socket.id + ' -> join to ' + chat)
  })

  socket.on('message',  async ({ message, chat }) => {
    console.log(socket.id + ' -> sent a message to ' + chat)
    io.to(chat).emit('message', message)
  })

  socket.on('connect', socket => {
    console.log(socket.id);
  })
  console.log('client connect...', socket.id);

  socket.on('disconnect', () => {
    console.log('client disconnect...', socket.id)
    delete connectedUsers[socket.id]
  })

  socket.on('error', (err) => {
    console.log('received error from client:', socket.id)
    console.log(err)
  })
})

server.listen(port, () => {
    console.log(`server running in" + ${port}`);
});