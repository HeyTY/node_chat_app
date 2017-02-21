const expect = require("expect");


var {generateMessage, generateLocationMessage} = require("./message");

describe("generateMessage", () => {
	it("should generate correct message object", () =>{
		var from = "Keira";
		var text = "Hey";
		var message = generateMessage(from,text); 

		
		expect(message.createdAt).toBeA("number");
		expect(message).toInclude({from,text});

	});
});



describe("generateLocationMessage", () => {
	it("should generate correct location object", () =>{
		var from = "Keira"
		var latitude = 7
		var longitude = 9
		var message = generateLocationMessage(from,latitude,longitude);
		var url = "https://www.google.com/maps?q=7,9"
		

		expect(message.url).toMatch("https://www.google.com/maps?q=7,9");
		expect(message).toInclude({from, url});
		expect(message.createdAt).toBeA("number");
	});
});