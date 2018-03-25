import express from "express"
import bodyParse from "body-parser"
import logger from "morgan"
import { catch404, handleError } from "./api/helpers/error"
import urlRoutes from "./api/routes/urlshortner"

/* App Init */
const app = express()
/* Middleware */

//body parser
app.use(bodyParse.json())
app.use(bodyParse.urlencoded({ extended: true }))

//logger
if (process.env.NODE_ENV === "dev") app.use(logger("dev"))

//routes
app.use("/", urlRoutes)

//catch 404 && handleError
app.use(catch404, handleError)

export default app
