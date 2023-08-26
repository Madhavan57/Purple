const express = require('express')
const router = express.Router()
const {post_command_details,getall_command_details} = require('../Controller/Command_controller')

router.route('/').post(post_command_details)
router.route('/:id').get(getall_command_details)

module.exports = router