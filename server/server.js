const express			= require("express");
const http				= require("http");
const path 				= require("path");
const socketIO			= require("socket.io");


const publicPath 		= path.join(__dirname, "../public");
const port 				= process.env.PORT || 3000;
const app				= express();
const server 			= http.createServer(app);
const io 				= socketIO(server);

app.use(express.static("public"))

io.on("connection", (socket) => {
	console.log("New user connected");

	socket.on("disconnect", (socket) => {
		console.log("User Disconnected");
	});
});




// app.get("/", (req,res) => {
// 	res.render("../public/index");
// });






server.listen(port, (req,res) => {
	console.log(`Server deployed on {port}!`);
});

