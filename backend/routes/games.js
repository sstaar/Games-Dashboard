const router = require('express').Router();
const gameControllers = require('../controllers/games');
const auth = require('../middleware/auth');

router.get("/", gameControllers.getGamesController);
router.patch("/:id", auth, gameControllers.patchGameController);
router.delete("/:id", auth, gameControllers.deleteGameController);
router.post('/', auth, gameControllers.addGameController);

module.exports = router;