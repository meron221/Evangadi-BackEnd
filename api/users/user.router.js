const router = require("express").Router();

//importing auth middleware
const auth = require("../middleware/auth");

const {
	createUser,
	getUserById,
	// getAllUsers,
	login,
} = require("./user.controller");
// const { getAllUsers } = require("./user.service");

//route new user to be registered using createUser controller
router.post("/", createUser);
// router.get("/all", getAllUsers);
//route existing user to be verified using auth middleware and getUserById
router.get("/", auth, getUserById);
// router.get("/", getUserById);
//route existing user to be login using login controller
router.post("/login", login);

module.exports = router;
