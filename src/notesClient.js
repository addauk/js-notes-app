class NotesClient {
  async loadNotes(callback) {
    const response = await fetch("http://localhost:3000/notes");
    const data = await response.json();
    return callback(data);
  }
}

module.exports = NotesClient;
