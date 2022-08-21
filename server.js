const exp = require("express")
const app = exp();
const port = 4000;
const path = require("path")
const userApi = require('./apis/user')
const mc = require("mongodb").MongoClient;
app.listen(port, () => console.log(`server on ${port}...`))
app.use(exp.static(path.join(__dirname, './build')))
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
const url="mongodb+srv://nikhil1:abdrpkljb@cluster0.g7sd3.mongodb.net/edcell?retryWrites=true&w=majority";
mc.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {

    if (err) {
        console.log("err in db connection", err.message);
    }
    else {
        let databaseObj = client.db("edcell")
        let userCollectionObj = databaseObj.collection("userotp")
        let userCollectionObj2 = databaseObj.collection("users")
        app.set("userCollectionObj", userCollectionObj)
        app.set("userCollectionObj2", userCollectionObj2)
        console.log("connected to database")

    }
})
var cors = require('cors')

app.use(cors()) 
app.use("/user", userApi)
app.use((req, res, next) => {

    res.send('<h1>invalid</h1>')
})

//error handling middleware
app.use((err, req, res, next) => {
    res.send({ message: `error is ${err.message}` })
})