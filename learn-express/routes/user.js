const express = require('express')
const router = express.Router();

router.get('/', (req, res) =>{
    res.send('user 화면')
})

router.get('/:id', (req, res) =>{
    res.send(`${req.params.id}, ${JSON.stringify(req.query)}, user`)
    console.log(req.query);
})

module.exports = router;