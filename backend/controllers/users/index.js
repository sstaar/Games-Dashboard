const jwt = require('jsonwebtoken');
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const textRegex = /^(?=.{5,30}$).+\s.+$/;
const passRegex = /^[a-zA-Z0-9_-]{6,30}$/;
const simpleTextRegex = /^[a-zA-Z0-9]{8,30}$/;
const fs = require('fs');
let Users = require('./users.json');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const loginController = async (request, response, next) => {
    try {
        const user = Users.find(item => item.username === request.body.username);
        await sleep(500);
        if (!user || user.password !== request.body.password)
            return response.status(400).json({
                username: "Invalid credentials.",
                password: "Invalid credentials."
            })
        const token = await jwt.sign({ id: user.id }, "DASHBOARD");
        return response.json({ token });
    } catch (error) {
        next(error)
    }
};

const getUsersController = async (request, response, next) => {
    try {
        const pageCount = request.query.size ? request.query.size : 12;
        const numberOfUsers = Users.length;
        const page = request.query.page ? request.query.page - 1 : 0;
        const sort = request.query.sort
        await sleep(500);

        let tempUsers = Users;
        if (sort) {
            tempUsers = tempUsers.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
        }

        tempUsers = tempUsers.slice(page * pageCount, page * pageCount + pageCount);

        return response.json({
            data: tempUsers,
            pages: Math.ceil(numberOfUsers / pageCount)
        });
    } catch (error) {
        next(error)
    }
};

const patchUserController = async (request, response, next) => {
    try {
        if (!Users.find(item => item.id == request.params.id))
            return response.status(404).json({
                message: "User not found."
            });
        const errors = {
            name: textRegex.test(request.body.name) ? null : 'The Name should be between 5 and 30 characters and at least one space',
            email: emailRegex.test(request.body.email) ? null : 'The Email format is not valid',
            address: textRegex.test(request.body.address) ? null : 'The Address should be between 5 and 30 characters and at least one space'
        }
        if (errors.name || errors.address || errors.email)
            return response.status(400).json(errors);

        let user = null;

        Users = Users.map(item => {
            if (item.id == request.params.id) {
                item.name = request.body.name;
                item.address = request.body.address;
                item.email = request.body.email;
                user = item;
            }
            return item
        });

        const updatedJson = JSON.stringify(Users, null, 4);
        fs.writeFileSync(__dirname + '/users.json', updatedJson, 'utf8');

        return response.json(user);
    } catch (error) {
        next(error)
    }
};

const deleteUserController = async (request, response, next) => {
    try {
        if (!Users.find(item => item.id == request.params.id))
            return response.status(404).json({
                message: "User not found."
            });

        Users.splice(Users.findIndex(item => item.id == request.params.id), 1)

        console.log(Users[1])

        const updatedJson = JSON.stringify(Users, null, 4);
        fs.writeFileSync(__dirname + '/users.json', updatedJson, 'utf8');

        return response.json({ message: "Success." });
    } catch (error) {
        next(error)
    }
};

const addUserController = async (request, response, next) => {
    try {
        const { name, email, address, password, username } = request.body;
        const errors = {
            name: name && textRegex.test(name) ? null : 'The Name should be between 5 and 30 characters and at least one space',
            email: email && emailRegex.test(email) ? Users.find(item => item.email === email) ? "Email already taken" : null : 'The Email format is not valid',
            address: address && textRegex.test(address) ? null : 'The Address should be between 5 and 30 characters and at least one space',
            username: username && simpleTextRegex.test(username) ? Users.find(item => item.username === username) ? "Username already taken" : null : 'The Username only accepts characters and numbers and only between 8 and 30 one',
            password: password && passRegex.test(password) ? null : 'The Password should have between 6 and 30 characters long'
        };
        if (errors.name || errors.address || errors.email || errors.username || errors.password)
            return response.status(400).json(errors);

        Users = [{ name, email, address, password, username, id: Date.now() }, ...Users];

        const updatedJson = JSON.stringify(Users, null, 4);
        fs.writeFileSync(__dirname + '/users.json', updatedJson, 'utf8');

        return response.json({ message: "Success." });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    loginController,
    getUsersController,
    patchUserController,
    deleteUserController,
    addUserController
}