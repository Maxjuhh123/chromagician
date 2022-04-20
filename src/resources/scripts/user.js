export default class User {
    constructor(username, password) {
        this.username = username;3
        this.password = password;
        this.recent = []; //store 5 most recent visited
        this.liked = []; //store all liked
        this.created = []; //store all created
    }
}

//defining getters and setters of User class
User.prototype.getUsername = function () {
    return this.username;
}

User.prototype.getFirstName = function () {
    return this.firstName;
}

User.prototype.getLastName = function () {
    return this.lastName;
}

User.prototype.getEmail = function () {
    return this.email;
}

User.prototype.getPassword = function () {
    return this.password;
}

User.prototype.setUsername = function (username) {
    this.username = username;
}

User.prototype.setFirstName = function (firstName) {
    this.firstName = firstName;
}

User.prototype.setLastName = function (lastName) {
    this.lastName = lastName;
}

User.prototype.setEmail = function (email) {
    this.email = email;
}

User.prototype.setPassword = function (password) {
    this.password = password;
}

User.prototype.setId = function (id) {
    this.id = id;
}
