const express = require('express')
const router = express.Router()
const viewsController = require('../controllers/viewsController')

router.get('/',viewsController.getOverview)
router.get('/join',viewsController.signup)
router.get('/about',viewsController.index)
module.exports = router