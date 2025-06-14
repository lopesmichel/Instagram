require ("dotenv").config()
require("./config/db"); 

const express = require ("express")
const path = require("path")
const cors = require("cors")

const port = process.env.PORT

const app = express()

//config JSON e form data response
app.use(express.json())
app.use(express.urlencoded({extended: false}))

//Solve CORS
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));

// upload directory
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));


// DB connection

// routes
const router = require("./routes/Router.js")
app.use(router)

app.listen(port, () => {
    console.log(`app rodando na porta ${port}`);
})
  
