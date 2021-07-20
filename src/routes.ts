import { Router} from 'express'

import authMiddleware from './apps/middlewares/authMiddleware'

import MessageController from './apps/controllers/MessageController'
import AuthController from './apps/controllers/AuthController'
import UserController from './apps/controllers/UserController'
import ManagerController from './apps/controllers/ManagerController'
import SchoolController from './apps/controllers/SchoolController'
import TeacherController from './apps/controllers/TeacherController'
import DocumentController from './apps/controllers/DocumentController'
import ClassroomController from './apps/controllers/ClassroomController'
import ClassroomStudentController from './apps/controllers/ClassroomStudentController'
import ClassroomDocumentController from './apps/controllers/ClassroomDocumentController'
import WorkController from './apps/controllers/WorkController'
import AdviceController from './apps/controllers/AdviceController'
import ChatController from './apps/controllers/ChatController'
import StudentController from './apps/controllers/StudentController'

const routes = Router()

routes.get('/', (request, response) => {
  response.sendFile(__dirname + '/index.html')
})

routes.post('/manager', ManagerController.store)
routes.put('/manager/:id', ManagerController.update)
routes.get('/manager/:id', ManagerController.find)
routes.get('/manager', ManagerController.index)

routes.get('/school', SchoolController.index)
routes.get('/school/:id', SchoolController.find)
routes.post('/school', SchoolController.store)
routes.put('/school/:id', SchoolController.update)
routes.delete('/school/:id', SchoolController.remove)

routes.get('/teacher', TeacherController.index)
routes.get('/teacher/:id', TeacherController.find)
routes.post('/teacher', TeacherController.store)
routes.put('/teacher/:id', TeacherController.update)
routes.delete('/teacher/:id', TeacherController.remove)

routes.get('/document', DocumentController.index)
routes.get('/document/:id', DocumentController.find)
routes.post('/document', DocumentController.store)
routes.put('/document/:id', DocumentController.update)
routes.delete('/document/:id', DocumentController.remove)

routes.get('/classroom', authMiddleware, ClassroomController.index)
routes.get('/classroom/:id', ClassroomController.find)
routes.post('/classroom', ClassroomController.store)
routes.put('/classroom/:id', ClassroomController.update)
routes.delete('/classroom/:id', ClassroomController.remove)

routes.get('/work', WorkController.index)
routes.get('/work/:id', WorkController.find)
routes.post('/work', WorkController.store)
routes.put('/work/:id', WorkController.update)
routes.delete('/work/:id', WorkController.remove)

routes.get('/advice', AdviceController.index)
routes.get('/advice/:id', AdviceController.find)
routes.post('/advice', AdviceController.store)
routes.put('/advice/:id', AdviceController.update)
routes.delete('/advice/:id', AdviceController.remove)

routes.get('/chat', ChatController.index)
routes.get('/chat/:id', ChatController.find)
routes.post('/chat', ChatController.store)
routes.delete('/chat/:id', ChatController.remove)

routes.get('/student', StudentController.index)
routes.get('/student/:id', StudentController.find)
routes.post('/student', StudentController.store)
routes.put('/student/:id', AdviceController.update)
routes.delete('/student/:id', StudentController.remove)

routes.post('/message', authMiddleware, MessageController.create)

routes.post('/classroom_student/:id', ClassroomStudentController.store)
routes.post('/classroom_document/:id', ClassroomDocumentController.store)

routes.post('/user', UserController.store)
routes.post('/authenticate', AuthController.authenticate)

export default routes;