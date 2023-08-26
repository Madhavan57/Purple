const express =  require('express')
const router = express.Router()
const createShop = require('../Controller/Shop_controller')

router.route('/').post(createShop)

module.exports = router     