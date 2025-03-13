const express = require('express')
const router = express.Router()
const noteHandler = require('./controller')

router.get('/', noteHandler.getAll)
router.post('/', noteHandler.create)
router.get('/:id', noteHandler.getOne)
router.put('/:id', noteHandler.update)
router.delete('/:id', noteHandler.remove)

module.exports = router
