import games from '../data/games.json';

const sleep = (halves) => new Promise(r => setTimeout(r, halves * 500));
const pageCount = 12;
const textRegex = /^(?=.{5,30}$).+\s.+$/;
const simpleTextRegex = /^[a-zA-Z]{5,30}$/;
const dateRegex = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;

export const getGames = async (page = 1, sort = null) => {
    return new Promise(async (resolve) => {
        const numberOfGames = games.length;
        page = page - 1;
        let tempGames = games;
        if (sort) {
            if (sort === 'date') {
                tempGames = tempGames.sort((a, b) => {
                    const d1 = new Date(a.date);
                    const d2 = new Date(b.date);
                    return (d1 > d2 ? 1 : -1)
                });
            }
            else
                tempGames = tempGames.sort((a, b) => (a[sort] > b[sort] ? 1 : -1));
        }
        const cutGames = tempGames.slice(page * pageCount, page * pageCount + pageCount);
        await sleep(2);
        return resolve({
            data: cutGames,
            pages: Math.ceil(numberOfGames / pageCount)
        });
    })
};

export const editGame = async (id, name, category, date) => {
    return new Promise(async (resolve, reject) => {
        const errors = {
            name: textRegex.test(name) ? null : 'The Name should be between 5 and 30 characters and at least one space',
            date: dateRegex.test(date) ? null : 'The Date should be a valid date with the form DD/MM/YYYY',
            category: simpleTextRegex.test(category) ? null : 'The Category should be between 5 and 30 characters with no space'
        }
        await sleep(2);
        if (errors.name || errors.date || errors.category)
            return reject(errors);
        let game = games.find(item => item.id === id);
        game.name = name;
        game.date = date;
        game.category = category;
        return resolve();
    })
};

export const deleteGame = async (id) => {
    return new Promise(async (resolve) => {
        games.splice(games.findIndex(game => game.id === id), 1)
        await sleep(2);
        return resolve({});
    })
};

export const addGame = async (name, category, date) => {
    return new Promise(async (resolve, reject) => {
        const errors = {
            name: textRegex.test(name) ? null : 'The Name should be between 5 and 30 characters and at least one space',
            date: dateRegex.test(date) ? null : 'The Date should be a valid date with the form DD/MM/YYYY',
            category: simpleTextRegex.test(category) ? null : 'The Category should be between 5 and 30 characters with no space'
        }
        await sleep(2);
        if (errors.name || errors.category || errors.date)
            return reject(errors);
        games = [{ name, category, date, id: Date.now() }, ...games];
        return resolve({
        });
    })
};