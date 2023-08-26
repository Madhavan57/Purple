function sessionsetter(req){
    var session = req.session
    session.db_name = "jiamazecom_shop"
    console.log("session name : "+session.db_name);
}

module.exports = sessionsetter