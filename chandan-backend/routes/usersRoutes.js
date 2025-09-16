import express from 'express'
import { getUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/usersController.js'
import { validateUser } from '../middlewares/validateRequest.js'

const router = express.Router()

router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', validateUser, createUser)
router.put('/:id', validateUser, updateUser)
router.delete('/:id', deleteUser)

export default router
