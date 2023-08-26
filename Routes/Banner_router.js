const express = require('express')
const router = express.Router()
const {
    post_banner_details,
    getall_banner_details,
    update_banner_details,
    delete_banner_details
} = require('../Controller/Banner_controller')

router.route('/').post(post_banner_details).get(getall_banner_details)

router.route('/:id').patch(update_banner_details).delete(delete_banner_details)

module.exports = router