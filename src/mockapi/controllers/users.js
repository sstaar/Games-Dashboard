import users from '../data/users.json';

const sleep = (halves) => new Promise(r => setTimeout(r, halves * 500));
const pageCount = 12;
const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
const textRegex = /^(?=.{5,30}$).+\s.+$/;
const passRegex = /^[a-zA-Z0-9_-]{6,30}$/;
const simpleTextRegex = /^[a-zA-Z0-9]{8,30}$/;

export const login = async (username, password) => {
    return new Promise(async (resolve, reject) => {
        const user = users.find(item => item.username === username);
        await sleep(3);
        if (!user || user.password !== password)
            return reject({
                username: "Invalid credentials.",
                password: "Invalid credentials."
            })
        return resolve(user);
    })
};

export const getUsers = async (page = 1, sort = null) => {
    return new Promise(async (resolve) => {
        const numberOfUsers = users.length;
        page = page - 1;
        let tempUsers = users;
        if (sort) {
            console.log("ALLO", sort)
            tempUsers = tempUsers.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
        }
        const cutUsers = tempUsers.slice(page * pageCount, page * pageCount + pageCount);
        await sleep(2);
        return resolve({
            data: cutUsers,
            pages: Math.ceil(numberOfUsers / pageCount)
        });
    })
};

export const editUser = async (id, name, email, address) => {
    return new Promise(async (resolve, reject) => {
        const errors = {
            name: textRegex.test(name) ? null : 'The Name should be between 5 and 30 characters and at least one space',
            email: emailRegex.test(email) ? null : 'The Email format is not valid',
            address: textRegex.test(address) ? null : 'The Address should be between 5 and 30 characters and at least one space'
        }
        await sleep(2);
        if (errors.name || errors.address || errors.email)
            return reject(errors);
        let user = users.find(item => item.id === id);
        user.name = name;
        user.address = address;
        user.email = email;
        return resolve();
    })
};

export const deleteUser = async (id) => {
    return new Promise(async (resolve) => {
        users.splice(users.findIndex(user => user.id === id), 1)
        await sleep(2);
        return resolve({});
    })
};

export const addUser = async (name, email, address, passord, username) => {
    return new Promise(async (resolve, reject) => {
        const numberOfUsers = users.length;
        const errors = {
            name: textRegex.test(name) ? null : 'The Name should be between 5 and 30 characters and at least one space',
            email: emailRegex.test(email) ? users.find(item => item.username === username) ? "Email already taken" : null : 'The Email format is not valid',
            address: textRegex.test(address) ? null : 'The Address should be between 5 and 30 characters and at least one space',
            username: simpleTextRegex.test(username) ? users.find(item => item.username === username) ? "Username already taken" : null : 'The Username only accepts characters and numbers and only between 8 and 30 one',
            password: passRegex.test(passord) ? null : 'The Password should have between 6 and 30 characters long'
        };
        if (errors.name || errors.address || errors.email || errors.password || errors.username)
            return reject(errors);
        await sleep(2);
        users = [{ name, email, address, passord, username, id: Date.now() }, ...users];
        return resolve({
        });
    })
};