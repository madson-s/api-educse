import express, { json } from "express"
import { createServer, Server } from 'http'
import cors from 'cors'
import socketIo from 'socket.io'

import routes from './routes'

import './types/method-override'
import './database/connect'

class App {
  public app: express.Application
  public server: Server
  private io: socketIo.Server
  public PORT: number

  constructor() {
    this.app = express()
    this.server = createServer(this.app)
    this.io = new socketIo.Server(this.server)
    this.PORT = 8100
    this.routes()
    this.listen()
  }

  routes() {
    this.app.use(cors())
    this.app.use(json())    
    this.app.use((request, response, next) => {
      request.io = this.io
      next()
    })
    this.app.use(routes)
  }

  private listen(): void {

    this.io.on('connection', (socket: any) => {
      console.log('a user connected')

      socket.on('disconnect', () => {
        console.log('user disconnected')
      })
    })
  }
}

export default new App()