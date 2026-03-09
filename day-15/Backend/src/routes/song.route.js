const { Router } = require("express");
const upload = require("../middleware/upload.middleware");
const  {uploadsong}  = require("../controllers/song.controller");


const router = Router();
router.post("/", upload.single('song'),uploadsong  )

module.exports = router;