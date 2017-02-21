var socket = io();



socket.on("connect", function() {
	console.log("Connnected to ChatApp!");
});

socket.on("disconnect", function () {
	console.log("Disconnected from ChatApp Server");
});


socket.on("welcomeMessage", function (message) {
	console.log(message);
});


socket.on("newUser", function (message) {
	console.log(message);
});


socket.on("newMessage", function (message) {
	console.log("New Message:", message);
	var li = jQuery("<li></li>");
	li.text(`${message.from}: ${message.text}`);

	jQuery("#messages").append(li);
});


jQuery("#message-form").on("submit", function (e) {
	e.preventDefault();

	socket.emit("createMessage", {
	from: "User",
	text: jQuery("[name=message]").val()	
	}, function () {

	});
});


