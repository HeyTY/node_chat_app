const express			= require("express");
const http				= require("http");
const path 				= require("path");
const socketIO			= require("socket.io");

const {generateMessage, generateLocationMessage} = require("./utils/message")
const publicPath 		= path.join(__dirname, "../public");
const port 				= process.env.PORT || 3000;
const app				= express();
const server 			= http.createServer(app);
const io 				= socketIO(server);


app.use(express.static("public"))


io.on("connection", (socket) => {
	console.log("New user is online");

	// Welcome User
	socket.emit("newMessage", generateMessage("admin","Hello User!"));

	// Broadcast new user login
	socket.broadcast.emit("newMessage",generateMessage("Admin","New User is Online"));

	// createMessage Listener	
	socket.on("createMessage", (message, callback) => {
		console.log("Create Message", message);

		// Emit to everyone on the connection
		io.emit("newMessage", generateMessage(message.from, message.text));	
		callback();
	});

	socket.on("createLocationMessage", (coords) =>{
		console.log("Coordinates:", coords);
		io.emit("newLocationMessage", generateLocationMessage("Admin", coords.latitude, coords.longitude));
	});

	// Diconnect from server
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

