import { Router} from 'express'

import AuthMiddleware from './apps/middlewares/AuthMiddleware'

import ManagerMiddleware from './apps/middlewares/ManagerMiddleware'
import SchoolMiddleware  from './apps/middlewares/SchoolMiddleware'
import TeacherMiddleware from './apps/middlewares/TeacherMiddleware'
import SchoolTeacherMiddleware from './apps/middlewares/SchoolTeacherMiddleware'
import DocumentMiddleware from './apps/middlewares/DocumentMiddleware'
import ClassroomMiddleware from './apps/middlewares/ClassroomMiddleware'
import ClassroomStudentMiddleware from './apps/middlewares/ClassroomStudentMiddleware'
import ClassroomDocumentMiddleware from './apps/middlewares/ClassroomDocumentMiddleware'
import WorkMiddleware from './apps/middlewares/WorkMiddleware'
import StudentMiddleware from './apps/middlewares/StudentMiddleware'
import AdviceMiddleware from './apps/middlewares/AdviceMiddleware'
import AuthenticationMiddleware from './apps/middlewares/AuthenticationMiddleware'
 import MessageMiddleware from './apps/middlewares/MessageMiddleware'

import MessageController from './apps/controllers/MessageController'
import AuthController from './apps/controllers/AuthController'
import ManagerController from './apps/controllers/ManagerController'
import SchoolController from './apps/controllers/SchoolController'
import SchoolTeacherController from './apps/controllers/SchoolTeacherController'
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

routes.get('/student', AuthMiddleware, StudentController.index)
routes.get('/student/:id', AuthMiddleware, StudentController.find)
routes.post('/student', StudentMiddleware.create, StudentController.create)
routes.put('/student/:id', AuthMiddleware, StudentMiddleware.update, AdviceController.update)
routes.delete('/student/:id', AuthMiddleware, StudentController.remove)

routes.post('/student_message', AuthMiddleware, MessageMiddleware.studentMessage, MessageController.createStudentMessage)
routes.post('/teacher_message', AuthMiddleware, MessageMiddleware.teacherMessage, MessageController.createTeacherMessage)

routes.post('/school_teacher', SchoolTeacherMiddleware.create, SchoolTeacherController.create)
routes.delete('/school_teacher', SchoolTeacherMiddleware.remove, SchoolTeacherController.remove)

routes.post('/classroom_document', ClassroomDocumentMiddleware.create, ClassroomDocumentController.create)
routes.delete('/classroom_document', ClassroomDocumentMiddleware.remove, ClassroomDocumentController.remove)

routes.post('/classroom_student', ClassroomStudentMiddleware.create, ClassroomStudentController.create)
routes.delete('/classroom_student', ClassroomStudentMiddleware.remove, ClassroomStudentController.remove)

routes.post('/manager_authenticate', AuthenticationMiddleware.manager, AuthController.managerAuthenticate)
routes.post('/teacher_authenticate', AuthenticationMiddleware.teacher,  AuthController.teacherAuthenticate)
routes.post('/student_authenticate', AuthenticationMiddleware.student, AuthController.studentAuthenticate)
routes.get('/teacher_revalidate',  AuthController.teacherRevalidate)
routes.get('/student_revalidate', AuthController.studentRevalidate)

export default routes