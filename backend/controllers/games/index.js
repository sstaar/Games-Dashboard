const jwt = require('jsonwebtoken');
const textRegex = /^(?=.{5,30}$).+\s.+$/;
const simpleTextRegex = /^[a-zA-Z]{5,30}$/;
const dateRegex = /^([1-9]|0[1-9]|1[0-2])\/([1-9]|0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
const fs = require('fs');
let Games = require('./games.json');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

const getGamesController = async (request, response, next) => {
    try {
        const pageCount = request.query.size ? request.query.size : 12;
        const numberOfGames = Games.length;
        const page = request.query.page ? request.query.page - 1 : 0;
        const sort = request.query.sort
        await sleep(500);

        let tempGames = Games;
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

        tempGames = tempGames.slice(page * pageCount, page * pageCount + pageCount);

        return response.json({
            data: tempGames,
            pages: Math.ceil(numberOfGames / pageCount)
        });
    } catch (error) {
        next(error)
    }
};

const patchGameController = async (request, response, next) => {
    try {
        if (!Games.find(item => item.id == request.params.id))
            return response.status(404).json({
                message: "Game not found."
            });
        const errors = {
            name: textRegex.test(request.body.name) ? null : 'The Name should be between 5 and 30 characters and at least one space',
            date: dateRegex.test(request.body.date) ? null : 'The Date should be a valid date with the form DD/MM/YYYY',
            category: simpleTextRegex.test(request.body.category) ? null : 'The Category should be between 5 and 30 characters with no space'
        }
        if (errors.name || errors.category || errors.date)
            return response.status(400).json(errors);

        let game = null;

        Games = Games.map(item => {
            if (item.id == request.params.id) {
                item.name = request.body.name;
                item.date = request.body.date;
                item.category = request.body.category;
                game = item;
            }
            return item
        });

        const updatedJson = JSON.stringify(Games, null, 4);
        fs.writeFileSync(__dirname + '/games.json', updatedJson, 'utf8');

        return response.json(game);
    } catch (error) {
        next(error)
    }
};

const deleteGameController = async (request, response, next) => {
    try {
        if (!Games.find(item => item.id == request.params.id))
            return response.status(404).json({
                message: "Game not found."
            });

        Games.splice(Games.findIndex(item => item.id == request.params.id), 1)

        const updatedJson = JSON.stringify(Games, null, 4);
        fs.writeFileSync(__dirname + '/games.json', updatedJson, 'utf8');

        return response.json({ message: "Success." });
    } catch (error) {
        next(error)
    }
};

const addGameController = async (request, response, next) => {
    try {
        const { name, date, category } = request.body;
        const errors = {
            name: textRegex.test(name) ? null : 'The Name should be between 5 and 30 characters and at least one space',
            date: dateRegex.test(date) ? null : 'The Date should be a valid date with the form DD/MM/YYYY',
            category: simpleTextRegex.test(category) ? null : 'The Category should be between 5 and 30 characters with no space'
        };
        if (errors.name || errors.date || errors.category)
            return response.status(400).json(errors);

        Games = [{ name, date, category, id: Date.now() }, ...Games];

        const updatedJson = JSON.stringify(Games, null, 4);
        fs.writeFileSync(__dirname + '/games.json', updatedJson, 'utf8');

        return response.json({ message: "Success." });
    } catch (error) {
        next(error)
    }
};

module.exports = {
    getGamesController,
    addGameController,
    patchGameController,
    deleteGameController
}