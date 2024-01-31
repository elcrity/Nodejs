const express = require('express')

const router = express.Router();

router.get('/', (req, rest) => {
    rest.render('index')
});

module.exports = router;