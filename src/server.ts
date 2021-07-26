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

let port = process.env.PORT || PORT;

app.use(cors())
app.use(json())    
app.use((request, response, next) => {
  request.io = io
  next()
})
app.use(routes)

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

server.listen(port, function () {
    console.log(`server running in" + ${port}`);
});