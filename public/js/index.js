var socket = io();



socket.on("connect", function() {
	console.log("Connnected to ChatApp!");
});


	socket.on("newMessage", function (message) {
		console.log("New Message:", message);
	});

	socket.on("disconnect", function () {
		console.log("Disconnected from ChatApp Server");
	});

