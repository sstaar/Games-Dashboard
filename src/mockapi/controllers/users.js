import users from '../data/users.json';

export const login = async (username, password) => {
    return new Promise((resolve, reject) => {
        const user = users.find(item => item.username === username);
        if (!user || user.password !== password)
            return reject({
                username: "Invalid credentials.",
                password: "Invalid credentials."

            })
        return resolve(user);
    })
};