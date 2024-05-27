let notes = [];

function getAllNotes() {
  return notes;
}

function addNote(newNote) {
  const note = { id: Date.now().toString(), ...newNote };
  notes.push(note);
  return note;
}

function getNoteById(id) {
  return notes.find((note) => note.id === id);
}

function deleteNoteById(id) {
  const index = notes.findIndex((note) => note.id === id);
  if (index !== -1) {
    const deletedNote = notes[index];
    notes.splice(index, 1);
    return deletedNote;
  }
  return null;
}

module.exports = {
  getAllNotes,
  addNote,
  getNoteById,
  deleteNoteById,
};