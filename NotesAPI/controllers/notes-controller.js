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
  console.log(noteId);
  const user = await User.findById(req.body.userId);
  console.log(user);
  if(!user){
    return res.status(403).json({message: "User not found"})
  }
  if(noteId){
    const updatedNote = await Note.findByIdAndUpdate(noteId,{$set: req.body.noteDetail},{
      new: true
    });
    return res.status(201).json(updatedNote)
  }else{
    const noteDetail = req.body.noteDetail;
    const newNote = {"title": noteDetail.title, "content":noteDetail.content,"isPin": noteDetail.isPin,"includedTags":noteDetail.includedTags, "userId": user._id}
    const note = await Note.create(newNote);
    // add the new note id to the noteId of User collection
    return res.status(201).json(note)
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