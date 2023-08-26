const express = require("express");
const router = express.Router();
const uploadMiddleware = require("../middlewares/uploadfile");

const {
  post_jewellery_details,
  delete_jewellery_details,
  update_jewellery_details,
  getall_jewellery_details,
  getid_jewellery_details,
} = require("../Controller/Jewellery_controller");

//create, update, find, delete

router
  .route("/")
  .post(uploadMiddleware, post_jewellery_details)
  .get(getall_jewellery_details);

router
  .route("/:id")
  .delete(delete_jewellery_details)
  .patch(update_jewellery_details)
  .get(getid_jewellery_details);

module.exports = router;
