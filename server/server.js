const express			= require("express");
const http				= require("http");
const path 				= require("path");
const socketIO			= require("socket.io");

const {isRealString}    = require("./utils/validation");
const {Users} 			= require("./utils/users");
const {generateMessage, generateLocationMessage} = require("./utils/message");
const publicPath 		= path.join(__dirname, "../public");
const port 				= process.env.PORT || 3000;
const app				= express();
const server 			= http.createServer(app);
const io 				= socketIO(server);

const users = new Users();


app.use(express.static("public"))


io.on("connection", (socket) => {
	console.log("New user is online");


	// Join chat setup
	socket.on("join", (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback("Name and room name are required")
		} else {

			// User Joins Room
			socket.join(params.room);
			// Remove User from any previous rooms
			users.removeUser(socket.id);
			// Add User to the new room
			users.addUser(socket.id,params.name,params.room);


			io.to(params.room).emit("updateUserList", users.getUserList(params.room));

			// socket.leave

		//io emit -> io.to("Starcraft 2 Fans").emit
		// socket.broadcast.emit -> socket.broadcast.to("Starcraft 2 Fans").emit
		// socket.emit	

		// Welcome User
		socket.emit("newMessage", generateMessage("Admin","Hello User!"));

		// Broadcast new user login
		socket.broadcast.to(params.room).emit("newMessage",generateMessage("Admin",`${params.name} has joined`));
			callback();
		}
	});

	// createMessage Listener	
	socket.on("createMessage", (message, callback) => {
		var user = users.getUser(socket.id);

		if (user && isRealString(message.text)) {
			// Emit to everyone on the connection
			io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
		}	
		callback();
	});

	socket.on("createLocationMessage", (coords) =>{
		var user = users.getUser(socket.id);

		if (user) {
			io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude));
		}
	});

	// Diconnect from server
	socket.on("disconnect", () => {
		var user = users.removeUser(socket.id);

		if (user) {
			io.to(user.room).emit("updateUserList", users.getUserList(user.room));
			io.to(user.room).emit("newMessage", generateMessage("Admin", `${user.name} has left`));
		}
	});

});





// app.get("/", (req,res) => {
// 	res.render("../public/index");
// });






server.listen(port, (req,res) => {
	console.log(`Server deployed on {port}!`);
});

