const express = require("express")

// create istance of router
const router = express.Router()

// import local files
const postController = require("../controllers/postController")

// define routes and link correct methods
router.get("/", postController.index)
router.get("/:slug", postController.show)
router.post("/", postController.create)
router.put("/:slug", postController.edit)
router.delete("/:slug", postController.destroy)

//export file
module.exports = router