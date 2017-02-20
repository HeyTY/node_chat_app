var socket = io();



socket.on("connect", function() {
	console.log("Connnected to ChatApp!");

	socket.emit("createMessage", {
		to: "Keira",
		text: "Hey what are you doing?"
	});

});


	socket.on("newMessage", function (message) {
		console.log("New Message:", message);
	});

	socket.on("disconnect", function () {
		console.log("Disconnected from ChatApp Server");
	});

