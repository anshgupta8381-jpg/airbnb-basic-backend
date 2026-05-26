//core module
const path = require('path');

//external module
const express = require('express');

//local module
const storeRouter= require("./routes/storeRouter");
const hostRouter = require("./routes/hostRouter");
const rootDir = require("./utils/pathUtil");
const errorsController = require('./controllers/errors')

const app= express();

app.use((req,res,next)=>{
  console.log(req.url, req.method);
  next();
})

app.use(express.urlencoded());

app.use(express.static(path.join(rootDir, 'public')));

app.set('view engine', 'ejs');
app.set('views', 'views')

app.use(storeRouter);

app.use(hostRouter);

app.use(errorsController.pageNotFound);


const PORT = 3001;
app.listen(PORT, ()=>{
  console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
})
