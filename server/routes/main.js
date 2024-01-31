const express = require('express');
const router = express.Router();

// routes

router.get('', (req, res) => {
    res.send('hello world - I\'m in the following path server/routes/main.js');
})



module.exports = router;