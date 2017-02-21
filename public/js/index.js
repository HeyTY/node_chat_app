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

socket.on("newLocationMessage", function (message){
	var li = jQuery("<li></li>");
	var a  = jQuery('<a target="_blank">My current Location</a>');

	li.text(`${message.from}: `);
	a.attr("href", message.url)
	li.append(a);
	jQuery("#messages").append(li);
});


jQuery("#message-form").on("submit", function (e) {
	e.preventDefault();

	var messageTextbox = jQuery("[name=message]");

	socket.emit("createMessage", {
	from: "User",
	text: messageTextbox.val()	
	}, function () {
	messageTextbox.val("");	
	});
});

var locationButton = jQuery("#send-location")

locationButton.on("click", function(){
	if (!navigator.geolocation) {
		return alert("Geolocation no supported by your browser");
	}

	locationButton.attr("disabled", "disabled").text("Sending location...")

	navigator.geolocation.getCurrentPosition(function(position){
		locationButton.removeAttr("disabled").text("Send location");
		socket.emit("createLocationMessage", {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		alert("Unable to fetch location.")
		locationButton.removeAttr("disabled").text("Send location");
	});
});


