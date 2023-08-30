function sessionsetter(req) {
  var session = req.session;
  session.db_name = "jiamazecom_shop";
}

module.exports = sessionsetter;
