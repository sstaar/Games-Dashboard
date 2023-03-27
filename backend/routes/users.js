const router = require('express').Router();
const userControllers = require('../controllers/users');
const auth = require('../middleware/auth');

router.post('/login', userControllers.loginController);
router.get("/", userControllers.getUsersController);
router.patch("/:id", auth, userControllers.patchUserController);
router.delete("/:id", auth, userControllers.deleteUserController);
router.post('/', auth, userControllers.addUserController);

module.exports = router;