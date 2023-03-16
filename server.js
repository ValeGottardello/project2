const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const session = require('express-session')
const MemoryStore = require("memorystore")(session)

//middlewares

const setCurrentUser = require("./middlewares/set_current_user")
const viewHelpers = require("./middlewares/view_helpers")
const logger = require("./middlewares/logger")
const methodOverride = require("./middlewares/method_override")


//controllers
const commentsController = require("./controllers/comments_controller")
const postsController = require("./controllers/posts_controller")       
const dashboardController = require("./controllers/dashboard_controller")   
const sessionController = require("./controllers/session_controller")
const userController = require("./controllers/user_controller")


const expressLayouts = require("express-ejs-layouts")

app.use(logger)
app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride) 
app.use(expressLayouts)
app.use(
  session({
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000,
    }),
    secret: process.env.SESSION_SECRET || "mistyrose",
    resave: false,
    saveUninitialized: true,
  })
)
//middlewares
app.use(setCurrentUser)
app.use(viewHelpers)

//controllers
app.use(sessionController)
app.use(dashboardController) 
app.use(postsController)   
app.use(commentsController)   
app.use(userController)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})