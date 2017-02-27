const expect = require("expect");

const {Users} = require("./users");


describe("Users", () => {

	var users;

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id: "1",
			name: "Ty",
			room: "Corgi Butt"
		},{
			id: "2",
			name: "Keira",
			room: "Corgi Butt"
		},{
			id: "3",
			name: "Boo",
			room: "React Course"
		}];
	});

	it("should add new user", () => {
		var users = new Users();
		var user = {
			id: "123abc",
			name: "Ty",
			room: "Corgi Fanclub"
		};
		var resUser = users.addUser(user.id,user.name,user.room);

		expect(users.users).toEqual([user]);
	});


	it("should remove user", () => {
		var userId = "3";
		var user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});


	it("should NOT remove user", () => {
		var userId = "5";
		var user = users.removeUser(userId);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});


	// Valid ID
	it("should find user", () =>{
		var userId = "2";
		var user = users.getUser(userId);

		expect(user.id).toBe(userId);
	});

	
	// Invalid ID
	it("should NOT find user", () => {
		var userId = "5";
		var user = users.getUser(userId);

		expect(user).toNotExist();

	})

	it("should return names for Corgi Butt Room", () =>{
		var userList = users.getUserList("Corgi Butt");

		expect(userList).toEqual(["Ty","Keira"]);
	});

		it("should return names for React Course Room", () =>{
		var userList = users.getUserList("React Course");

		expect(userList).toEqual(["Boo"]);
	});

});