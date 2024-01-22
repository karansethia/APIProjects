const asyncWrapper = require('../middleware/async-wrapper');
const Note = require('../models/note');
const User = require('../models/user');
const sendNotesController = asyncWrapper(async(req,res) => {
  //get all the notes from mongodb
  const user = await User.findById(req.body.userId);
  if(!user){
    return res.status(403).json({message: "User not found"})
  }
  const allNotes = await Note.find({userId: req.body.userId});
  console.log(allNotes);
  //send all the user's notes in response 
  res.status(201).json({notes: allNotes})
})
const postNotesController = asyncWrapper(async(req,res) => {
  //get id => if id exists then update else save new note
  const noteId = req.body.noteId; //todo find the id through user collection in mongodb
  const user = await User.findById(req.body.userId);
  if(!user){
    return res.status(403).json({message: "User not found"})
  }
  if(noteId){
    const updatedNote = await Note.findByIdAndUpdate(noteId,{$set: req.body.noteDetail},{
      new: true
    });
    return res.status(201).json(updatedNote)
  }else{
    const newNote = await Note.create({...req.body.noteDetail,userId: user._id},{new: true});
    // add the new note id to the noteId of User collection
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