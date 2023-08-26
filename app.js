const express = require('express')
const app =  express()
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const shop_router = require('./Routes/Shop_router')
const jewel_router = require('./Routes/Jewellery_router')
const banner_router = require('./Routes/Banner_router')
const command_router = require('./Routes/Command_router')
const newsfeed_router = require('./Routes/Newsfeed_router')
const user_router = require('./Routes/Users_router')
const staff_router = require('./Routes/Staff_router')

const notFound = require('./middlewares/not-found');
const errorHandlerMiddleware = require('./middlewares/error-handler');



//middlewares

app.use(express.json())

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir777",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

//routes

app.use('/purple/v1/jewel',jewel_router)
app.use('/purple/v1/login',shop_router)
app.use('/purple/v1/banner',banner_router)
app.use('/purple/v1/command',command_router)
app.use('/purple/v1/newsfeed',newsfeed_router)
app.use('/purple/v1/user',user_router)
app.use('/purple/v1/staff',staff_router)


//handlers

app.use(notFound);
app.use(errorHandlerMiddleware);
const port = 3000


app.listen(port, ()=>{
    console.log(`app is listening on port ${port}`);
})
 