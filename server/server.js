const express			= require("express");
const path 				= require("path");


const publicPath 		= path.join(__dirname, "../public");
const port = process.env.PORT || 3000;
const app				= express();

app.use(express.static("public"))




// app.get("/", (req,res) => {
// 	res.render("../public/index");
// });






app.listen(port, (req,res) => {
	console.log(`Server deployed on {port}!`);
});

