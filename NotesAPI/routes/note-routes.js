const express = require('express');
const router = express.Router();

router.get('/notes',()=>{}) // to send all the notes to react app
router.post('/notes',()=>{}) // to accept incoming notes from redux state from react app

module.exports = router;