import { Router} from 'express'

import AuthMiddleware from './apps/middlewares/AuthMiddleware'

import ManagerMiddleware from './apps/middlewares/ManagerMiddleware'
import SchoolMiddleware  from './apps/middlewares/SchoolMiddleware'
import TeacherMiddleware from './apps/middlewares/TeacherMiddleware'
import DocumentMiddleware from './apps/middlewares/DocumentMiddleware'
import ClassroomMiddleware from './apps/middlewares/ClassroomMiddleware'
import WorkMiddleware from './apps/middlewares/WorkMiddleware'
import StudentMiddleware from './apps/middlewares/StudentMiddleware'
import AdviceMiddleware from './apps/middlewares/AdviceMiddleware'
import AuthenticationMiddleware from './apps/middlewares/AuthenticationMiddleware'

import MessageController from './apps/controllers/MessageController'
import AuthController from './apps/controllers/AuthController'
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

routes.get('/manager', AuthMiddleware, ManagerController.index)
routes.get('/manager/:id', AuthMiddleware, ManagerController.find)
routes.post('/manager', ManagerMiddleware.create, ManagerController.create)
routes.put('/manager/:id', AuthMiddleware, ManagerMiddleware.update, ManagerController.update)
routes.delete('/manager/:id', AuthMiddleware, ManagerController.remove)

routes.get('/school', AuthMiddleware, SchoolController.index)
routes.get('/school/:id', AuthMiddleware, SchoolController.find)
routes.post('/school', AuthMiddleware, SchoolMiddleware.create, SchoolController.create)
routes.put('/school/:id', AuthMiddleware, SchoolMiddleware.update, SchoolController.update)
routes.delete('/school/:id', AuthMiddleware, SchoolController.remove)

routes.get('/teacher', AuthMiddleware, TeacherController.index)
routes.get('/teacher/:id', AuthMiddleware, TeacherController.find)
routes.post('/teacher', TeacherMiddleware.create, TeacherController.create)
routes.put('/teacher/:id', AuthMiddleware, TeacherMiddleware.update, TeacherController.update)
routes.delete('/teacher/:id', AuthMiddleware, TeacherController.remove)

routes.get('/document', AuthMiddleware, DocumentController.index)
routes.get('/document/:id', AuthMiddleware, DocumentController.find)
routes.post('/document', AuthMiddleware, DocumentMiddleware.create, DocumentController.create)
routes.put('/document/:id', AuthMiddleware, DocumentMiddleware.update, DocumentController.update)
routes.delete('/document/:id', AuthMiddleware, DocumentController.remove)

routes.get('/classroom', AuthMiddleware, ClassroomController.index)
routes.get('/classroom/:id', AuthMiddleware, ClassroomController.find)
routes.post('/classroom', AuthMiddleware, ClassroomMiddleware.create, ClassroomController.create)
routes.put('/classroom/:id', AuthMiddleware, ClassroomMiddleware.update, ClassroomController.update)
routes.delete('/classroom/:id', AuthMiddleware, ClassroomController.remove)

routes.get('/work', AuthMiddleware, WorkController.index)
routes.get('/work/:id', AuthMiddleware, WorkController.find)
routes.post('/work', AuthMiddleware, WorkMiddleware.create, WorkController.create)
routes.put('/work/:id', AuthMiddleware, WorkMiddleware.update, WorkController.update)
routes.delete('/work/:id', AuthMiddleware, WorkController.remove)

routes.get('/advice', AuthMiddleware, AdviceController.index)
routes.get('/advice/:id', AuthMiddleware, AdviceController.find)
routes.post('/advice', AuthMiddleware, AdviceMiddleware.create, AdviceController.create)
routes.put('/advice/:id', AuthMiddleware, AdviceMiddleware.update, AdviceController.update)
routes.delete('/advice/:id', AuthMiddleware, AdviceController.remove)

routes.get('/chat', AuthMiddleware, ChatController.index)
routes.get('/chat/:id', AuthMiddleware, ChatController.find)
routes.post('/chat', AuthMiddleware, ChatController.store)
routes.delete('/chat/:id', AuthMiddleware, ChatController.remove)

routes.get('/student', AuthMiddleware, StudentController.index)
routes.get('/student/:id', AuthMiddleware, StudentController.find)
routes.post('/student', StudentMiddleware.create, StudentController.create)
routes.put('/student/:id', AuthMiddleware, StudentMiddleware.update, AdviceController.update)
routes.delete('/student/:id', AuthMiddleware, StudentController.remove)

routes.post('/message', AuthMiddleware, MessageController.create)

routes.post('/classroom_student/:id', ClassroomStudentController.store)
routes.post('/classroom_document/:id', ClassroomDocumentController.store)

routes.post('/manager_authenticate', AuthenticationMiddleware.manager, AuthController.managerAuthenticate)
routes.post('/teacher_authenticate', AuthenticationMiddleware.teacher,  AuthController.teacherAuthenticate)
routes.post('/student_authenticate', AuthenticationMiddleware.student, AuthController.studentAuthenticate)

export default routes;