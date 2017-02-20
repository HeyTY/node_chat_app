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
	console.log("New user is online");


socket.on("createMessage", function (message){
	console.log("Create Message", message);
	
	// Emit to everyone on the connection
	io.emit("newMessage", {
		from: message.from,
		text: message.text,
		createdAt: new Date()
	});
});


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

