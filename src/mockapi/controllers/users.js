import users from '../data/users.json';

const sleep = (halves) => new Promise(r => setTimeout(r, halves * 500));
const numberOfUsers = users.length;

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

export const getUsers = async (page = 0) => {
    return new Promise(async (resolve) => {
        const users = users.splice(page * 10, page * 10 + 9);
        await sleep(2);
        return resolve({
            data: users,
            pages: Math.ceil(numberOfUsers / 10)
        });
    })
};