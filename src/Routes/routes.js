const express = require("express")

const {createUsers, userLogin} = require("../Controllers/userController")
const {createCars,soldcarCreate} = require("../Controllers/soldcarController")

const router = express.Router()

router.get('/test-me', function (req, res) {
    res.send({ test: "Test-API" })
})


router.post('/register', createUsers)
router.post('/login', userLogin)


router.post('/createCars', createCars)
router.post('/soldcarCreate', soldcarCreate)



router.all("/*", function (req, res) { res.status(404).send({ status: false, msg: "Invalid HTTP request" }) })
module.exports = router