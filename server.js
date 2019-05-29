const express = require("express");

const PORT = process.env.PORT || 8080;

const app = express();

//loads the public dir
app.use(express.static('public'));

// Parse application body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//set handlebars
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main"}));
app.set("view engine", "handlebars");
//import routes and give server access to them
const routes = require("./controllers/burgers_controllers.js");
app.use(routes);
//start server
app.listen(PORT, function(){
  console.log("app listening on PORT "+ PORT);
})