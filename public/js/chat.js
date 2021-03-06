var socket = io();


// Scroll function

function scrollToBottom () {
	// Selectors
	var messages   = jQuery("#messages");
	var newMessage = messages.children("li:last-child");
	// Heights
	var clientHeight 	 = messages.prop("clientHeight");
	var scrollTop   	 = messages.prop("scrollTop");
	var scrollHeight	 = messages.prop("scrollHeight");
	var newMessageHeight = newMessage.innerHeight();  
	var lastMessageHeight = newMessage.prev().innerHeight();

	if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}

socket.on("connect", function() {
	var params = jQuery.deparam(window.location.search);

	socket.emit("join", params, function (err){
		if (err) {
			alert(err);
			window.location.href = "/";
		} else {
			console.log("No error");
		}
	});
});

socket.on("disconnect", function () {
	console.log("Disconnected from ChatApp Server");
});

socket.on("updateUserList", function (users) {
	var ul = jQuery("<ul></ul>");

	users.forEach(function(user) {
		ul.append(jQuery("<li></li>").text(user));
	});
	jQuery("#users").html(ul);
});


socket.on("welcomeMessage", function (message) {
	console.log(message);
});


socket.on("newUser", function (message) {
	console.log(message);
});


socket.on("newMessage", function (message) {
	
	var formattedTime 	= moment(message.createdAt).format("h:mm a")
	var template 		= jQuery("#message-template").html();
	var html 	 		= Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formattedTime
	});

	jQuery("#messages").append(html);
	scrollToBottom()
	
	// Old method without template
	// var li = jQuery("<li></li>");
	// var formattedTime = moment(message.createdAt).format("h:mm a")


	// li.text(`${message.from} ${formattedTime}: ${message.text} `);

	// jQuery("#messages").append(li);
});

socket.on("newLocationMessage", function (message){

	
	var formattedTime 	= moment(message.createdAt).format("h:mm a")
	var template 		= jQuery("#location-message-template").html();
	var html     		= Mustache.render(template,{
		from: message.from,
		url:  message.url,
		createdAt: formattedTime
	});

	jQuery("#messages").append(html);
	scrollToBottom();
});


jQuery("#message-form").on("submit", function (e) {
	e.preventDefault();

	var messageTextbox = jQuery("[name=message]");

	socket.emit("createMessage", {
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



