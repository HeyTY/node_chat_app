[{
	id: "#1lk2g23vj22jh",
	name: "Ty",
	room: "Corgi Fans"
}]

// addUser (id,name,room)

// removeUser(id)

// getUser(id)

// getUserList(room)



class Users {
 constructor () {
  this.users = [];
 }
 addUser (id, name, room) {
 	var user = {id, name, room};
 	this.users.push(user);
 	return user;
 }


// filter method on array - search thru user array finding items with ID
 removeUser (id) {
 	var user = this.getUser(id);

 	if (user) {
 		this.users = this.users.filter((user) => {
 			return user.id !== id
 		})
 	}
 	return user;
 }

 getUser(id) {
 	var user = this.users.filter((user)=> user.id === id)
 	return user[0]
 }

 getUserList(room) {
 	var users = this.users.filter((user) => user.room === room);
 	var namesArray = users.map((user) =>  user.name);

 	return namesArray;
 }
}


module.exports = {Users};



// class Person {
//  constructor (name,age) {
//  	this.name = name;
//  	this.age = age;
//  }

//  getUserDescription () {
//  	return `${this.name} is ${this.age} year(s) old`;
//  }
// }

// var me = new Person ("Ty",28);

// console.log("this.name", me.name);
// console.log("this.age", me.age);

// var her = new Person ("Keira",22);
// console.log("this.name", her.name);
// console.log("this.age", her.age);

// var description = me.getUserDescription();
// console.log(description);