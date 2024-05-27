const http = require('http');
const url = require('url');
const notes = require('./notes');

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);
  const { pathname, query } = reqUrl;

  // Routing
  if (pathname === '/notes' && req.method === 'GET') {
    // Handle GET request for all notes
    const allNotes = notes.getAllNotes();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(allNotes));
  } else if (pathname === '/notes' && req.method === 'POST') {
    // Handle POST request to add a new note
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      const newNote = JSON.parse(body);
      const addedNote = notes.addNote(newNote);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(addedNote));
    });
  } else if (pathname.startsWith('/notes/') && req.method === 'GET') {
    // Handle GET request for a specific note by ID
    const noteId = pathname.split('/')[2];
    const note = notes.getNoteById(noteId);
    if (note) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(note));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Note not found' }));
    }
  } else if (pathname.startsWith('/notes/') && req.method === 'DELETE') {
    // Handle DELETE request to delete a note by ID
    const noteId = pathname.split('/')[2];
    const deletedNote = notes.deleteNoteById(noteId);
    if (deletedNote) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Note deleted successfully' }));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Note not found' }));
    }
  } else {
    // Handle invalid routes
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});