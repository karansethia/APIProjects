const asyncWrapper = require('../middleware/async-wrapper');
const Note = require('../models/note')
const sendNotesController = asyncWrapper(async(req,res) => {
  //get all the notes from mongodb
  const allNotes = await Note.find({});
  console.log(allNotes);
  //send all the user's notes in response 
  res.status(201).json({notes: allNotes})
})
const postNotesController = asyncWrapper(async(req,res) => {
  //get id => if id exists then update else save new note
  const noteid = req.body.noteid; //todo fiind the id through user collection in mongodb
  if(noteid){
    const updatedNote = await Note.findByIdAndUpdate(noteid,{$set: req.body},{
      new: true
    });
    return res.status(201).json(updatedNote)
  }else{
    const newNote = await Note.create({...req.body})
    return res.status(201).json(newNote)
  }
} );

const deleteNotesController = asyncWrapper(async(req,res)=> {
  try {
    await Note.findByIdAndDelete(req.body.noteid);
    return res.json({message: "Deleted"})
    
  } catch (error) {
    return res.json({message: error.message})
    
  }
})

module.exports = {
  sendNotesController,
  postNotesController,
  deleteNotesController
}