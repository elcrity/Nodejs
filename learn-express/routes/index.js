const express = require('express');
const router = express.Router();


router.get('/', (req,res) => {
    res.send('index', {title: 'Express '})
})

module.exports = router;

