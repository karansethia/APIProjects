const express = require('express');
const { sendNotesController, postNotesController } = require('../controllers/notes-controller');
const router = express.Router();

router.get('/notes',sendNotesController) // to send all the notes to react app
router.post('/notes/update',postNotesController) // to accept incoming notes from redux state from react app
router.post('/notes/delete',postNotesController) // to accept incoming notes from redux state from react app

module.exports = router;