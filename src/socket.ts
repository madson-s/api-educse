import SocketIO, { Socket } from 'socket.io'
import { Server } from 'http'

export default function SocketServer(server: Server) {
  
  const io = new SocketIO(server)

  io.on('connection', (socket: Socket) => {
  
    console.log('client connect...', socket.id);

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
  
    socket.on('disconnect', () => {
      console.log('client disconnect...', socket.id)
    })
  
    socket.on('error', (err) => {
      console.log('received error from client:', socket.id)
      console.log(err)
    })
  })

  return io;
}