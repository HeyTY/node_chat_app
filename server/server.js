const express			= require("express");
const http				= require("http");
const path 				= require("path");
const socketIO			= require("socket.io");

const {generateMessage} = require("./utils/message")
const publicPath 		= path.join(__dirname, "../public");
const port 				= process.env.PORT || 3000;
const app				= express();
const server 			= http.createServer(app);
const io 				= socketIO(server);


app.use(express.static("public"))


io.on("connection", (socket) => {
	console.log("New user is online");


socket.on("createMessage", function (message){
	console.log("Create Message", message);
	


	// socket.brodcast.emit // everyone but the user who join from admin "New User Joined"



	// Emit to everyone on the connection
	io.emit("newMessage", generateMessage("Admin","Welcome to ChatApp"));

});

	// Broadcast new user login
	socket.broadcast.emit("newUser",generateMessage("Admin","New User is Online"));


	// Welcome User
	socket.emit("welcomeMessage", generateMessage("admin","Hello User!"));

	// Diconnect
	socket.on("disconnect", (socket) => {
		console.log("User is offline");
	});

});





// app.get("/", (req,res) => {
// 	res.render("../public/index");
// });






server.listen(port, (req,res) => {
	console.log(`Server deployed on {port}!`);
});

