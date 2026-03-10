const { Router } = require("express");
const upload = require("../middleware/upload.middleware");
const  {uploadsong, getsongs}  = require("../controllers/song.controller");


const router = Router();
router.post("/", upload.single('song'),uploadsong  )
router.get("/", getsongs  )


module.exports = router;