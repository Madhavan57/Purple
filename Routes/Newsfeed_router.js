const express = require("express");
const router = express.Router();
const {
  getall_newsfeed_details,
  post_newsfeed_details,
  update_newsfeed_details,
  delete_newsfeed_details,
} = require("../Controller/Newsfeed_controller");

const uploadMiddleware = require("../middlewares/singlefileupload");

router
  .route("/")
  .post(uploadMiddleware, post_newsfeed_details)
  .get(getall_newsfeed_details);

router
  .route("/:id")
  .patch(update_newsfeed_details)
  .delete(delete_newsfeed_details);

module.exports = router;
