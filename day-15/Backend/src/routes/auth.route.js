const { Router } = require("express");
const router = Router();
const { register, login,getme,logoutcontroller } = require("../controllers/auth.controller");
const { userauth } = require("../middleware/auth.middleware");

router.post("/register", register);
router.post("/login", login);
router.get("/getme", userauth,getme);
router.get("/logout",userauth,logoutcontroller)

module.exports = router;
