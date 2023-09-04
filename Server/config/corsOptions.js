
const whightList = ["http://localhost:3500","http://localhost:5173" ];
const corsOptions = {
    origin: function(origin, callback)  {
        if (whightList.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error("Not Allowed By CORS"))
        }
    },
    optionSuccessStatus: 200
}


module.exports = corsOptions;