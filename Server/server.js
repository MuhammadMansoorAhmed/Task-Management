const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const corsOptions = require("./config/corsOptions");
const ConnectDB = require("./config/DbCon");


const app = express();

const PORT = process.env.PORT || 3500;
ConnectDB();
app.use(cors(corsOptions));
//Middleware for Data retrieval from front-end
app.use(express.json());
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', require('./Routes/root'))
app.use("/login", require('./Routes/login.js'));
app.use("/register", require('./Routes/register.js'));
app.use('/refresh', require('./Routes/refresh.js'))
app.use('/tasks', require('./Routes/tasks.js'));
app.use('/user',require('./Routes/user'))

app.listen(PORT, () => {
    console.log("server is running on port 3500")
})