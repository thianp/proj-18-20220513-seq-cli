const express = require('express')

const todoController = require('../controllers/todoController')
const userMiddleware = require('../middlewares/user')

const router = express.Router()

router.post('/', userMiddleware.getUserById, todoController) // last arg incomplete 
router.get('/', userMiddleware.getUserById, todoController) // last arg incomplete
router.get('/:id', userMiddleware.getUserById, todoController) // last arg incomplete
router.put('/:id', userMiddleware.getUserById, todoController) // last arg incomplete
router.delete('/:id', userMiddleware.getUserById, todoController) // last arg incomplete

module.exports = router;