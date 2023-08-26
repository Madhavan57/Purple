const express = require('express')
const router = express.Router()
const {
    post_staff_details,
    getid_staff_details,
    update_staff_details
} = require('../Controller/Staff_controller')

router.route('/').post(post_staff_details)
router.route('/:id').get(getid_staff_details).patch(update_staff_details)

module.exports = router