const express = require('express')
const router = express.Router()
const viewsController = require('../controllers/viewsController')

router.get('/',viewsController.index)
router.get('/join',viewsController.signup)
router.get('/about',viewsController.getOverview)
module.exports = router