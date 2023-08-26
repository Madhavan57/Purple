const express = require('express')
const router = express.Router()
const {
    post_user_details,
    getbyid_user_details,
    update_user_details
} = require('../Controller/Users_controller')

router.route('/').post(post_user_details)
router.route('/:id').get(getbyid_user_details).patch(update_user_details)

module.exports = router