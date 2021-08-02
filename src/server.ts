import 'reflect-metadata';

import express, { json } from "express"
import http from 'http'
import cors from 'cors'

import routes from './routes'
import SocketServer from './socket';

import './types/method-override'
import './database/connect'

const app = express()
const server = http.createServer(app)
const io = SocketServer(server)
const PORT = 8100

let port = process.env.PORT || PORT;

app.use(cors())
app.use(json())    
app.use((request, response, next) => {
  request.io = io
  next()
})
app.use(routes)

app.get('/',(req, res) => res.sendFile(__dirname + '/public/index.html'));

server.listen(port, () => {
    console.log(`server running in" + ${port}`);
});