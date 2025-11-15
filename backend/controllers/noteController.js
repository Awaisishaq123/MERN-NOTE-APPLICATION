import Note from "../models/noteModel.js";

// GET /notes
export const getNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user._id });
  res.json(notes);
};

// POST /notes
export const createNote = async (req, res) => {
  const { title, content } = req.body;
  const note = new Note({
    user: req.user._id,
    title,
    content,
  });
  const createdNote = await note.save();
  res.status(201).json(createdNote);
};

// PATCH /notes/:id
export const updateNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note && note.user.toString() === req.user._id.toString()) {
    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;
    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404).json({ message: "Note not found or unauthorized" });
  }
};

// DELETE /notes/:id
export const deleteNote = async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (note && note.user.toString() === req.user._id.toString()) {
    await note.deleteOne();
    res.json({ message: "Note deleted" });
  } else {
    res.status(404).json({ message: "Note not found or unauthorized" });
  }
};
