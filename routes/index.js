const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");
const userController = require("../controllers/userController");
const postController = require("../controllers/postController");
const imageMiddleware = require("../middlewares/imageMiddleware");
const authMiddleware = require("../middlewares/authMiddlerare");

router.get("/", homeController.userMiddleware, homeController.index);

router.get("/users/login", userController.login);
router.post("/users/login", userController.loginAction);
router.get("/users/logout", userController.logout);

router.get("/users/profile", authMiddleware.isLogged, userController.profile);
router.post(
	"/users/profile",
	authMiddleware.isLogged,
	userController.profileAction
);

router.post(
	"/users/profile/password",
	authMiddleware.isLogged,
	authMiddleware.changePassword
);

router.get("/users/register", userController.register);
router.post("/users/register", userController.registerAction);

router.get("/users/forget", userController.forget);
router.post("/users/forget", userController.forgetAction);
router.get("/users/reset/:token", userController.forgetToken);
router.post("/users/reset/:token", userController.forgetTokenAction);

router.get(
	"/post/add",
	authMiddleware.isLogged,
	postController.canEdit,
	postController.add
);
router.post(
	"/post/add",
	authMiddleware.isLogged,
	postController.canEdit,
	imageMiddleware.upload,
	imageMiddleware.resize,
	postController.addAction
);

router.get("/post/:slug/edit", authMiddleware.isLogged, postController.edit);
router.post(
	"/post/:slug/edit",
	authMiddleware.isLogged,
	imageMiddleware.upload,
	imageMiddleware.resize,
	postController.editAction
);

router.get("/post/:slug", postController.view);

module.exports = router;
