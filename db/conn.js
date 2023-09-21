const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/InternetFolks', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("connect to db"))
    .catch((e) => console.log("error to connecting db", e))