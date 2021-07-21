import { Router} from 'express'

import AuthMiddleware from './apps/middlewares/AuthMiddleware'
import StudentValidationMiddleware from './apps/middlewares/StudentValidationMiddleware'

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

routes.post('/manager', AuthMiddleware, ManagerController.store)
routes.put('/manager/:id', AuthMiddleware, ManagerController.update)
routes.get('/manager/:id', AuthMiddleware, ManagerController.find)
routes.get('/manager', AuthMiddleware, ManagerController.index)

routes.get('/school', AuthMiddleware, SchoolController.index)
routes.get('/school/:id', AuthMiddleware, SchoolController.find)
routes.post('/school', AuthMiddleware, SchoolController.store)
routes.put('/school/:id', AuthMiddleware, SchoolController.update)
routes.delete('/school/:id', AuthMiddleware, SchoolController.remove)

routes.get('/teacher', AuthMiddleware, TeacherController.index)
routes.get('/teacher/:id', AuthMiddleware, TeacherController.find)
routes.post('/teacher', TeacherController.store)
routes.put('/teacher/:id', AuthMiddleware, TeacherController.update)
routes.delete('/teacher/:id', AuthMiddleware, TeacherController.remove)

routes.get('/document', AuthMiddleware, DocumentController.index)
routes.get('/document/:id', AuthMiddleware, DocumentController.find)
routes.post('/document', AuthMiddleware, DocumentController.store)
routes.put('/document/:id', AuthMiddleware, DocumentController.update)
routes.delete('/document/:id', AuthMiddleware, DocumentController.remove)

routes.get('/classroom', AuthMiddleware, ClassroomController.index)
routes.get('/classroom/:id', AuthMiddleware, ClassroomController.find)
routes.post('/classroom', AuthMiddleware, ClassroomController.store)
routes.put('/classroom/:id', AuthMiddleware, ClassroomController.update)
routes.delete('/classroom/:id', AuthMiddleware, ClassroomController.remove)

routes.get('/work', AuthMiddleware, WorkController.index)
routes.get('/work/:id', AuthMiddleware, WorkController.find)
routes.post('/work', AuthMiddleware, WorkController.store)
routes.put('/work/:id', AuthMiddleware, WorkController.update)
routes.delete('/work/:id', AuthMiddleware, WorkController.remove)

routes.get('/advice', AuthMiddleware, AdviceController.index)
routes.get('/advice/:id', AuthMiddleware, AdviceController.find)
routes.post('/advice', AuthMiddleware, AdviceController.store)
routes.put('/advice/:id', AuthMiddleware, AdviceController.update)
routes.delete('/advice/:id', AuthMiddleware, AdviceController.remove)

routes.get('/chat', AuthMiddleware, ChatController.index)
routes.get('/chat/:id', AuthMiddleware, ChatController.find)
routes.post('/chat', AuthMiddleware, ChatController.store)
routes.delete('/chat/:id', AuthMiddleware, ChatController.remove)

routes.get('/student', AuthMiddleware, StudentController.index)
routes.get('/student/:id', AuthMiddleware, StudentController.find)
routes.post('/student', StudentValidationMiddleware, StudentController.store)
routes.put('/student/:id', AuthMiddleware, AdviceController.update)
routes.delete('/student/:id', AuthMiddleware, StudentController.remove)

routes.post('/message', AuthMiddleware, MessageController.create)

routes.post('/classroom_student/:id', ClassroomStudentController.store)
routes.post('/classroom_document/:id', ClassroomDocumentController.store)

routes.post('/user', UserController.store)

routes.post('/manager_authenticate', AuthController.managerAuthenticate)
routes.post('/teacher_authenticate', AuthController.teacherAuthenticate)
routes.post('/student_authenticate', AuthController.studentAuthenticate)

export default routes;