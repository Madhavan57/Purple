const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const uploadfile = require("../middlewares/singlefileupload");

const {
  post_user_details,
  getbyid_user_details,
  update_user_details,
} = require("../Controller/Users_controller");

router
  .route("/")
  .post(post_user_details)
  .get(upload.none(), getbyid_user_details);
router.route("/:id").patch(uploadfile, update_user_details);

module.exports = router;
