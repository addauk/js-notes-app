class NotesClient {
  async loadNotes(callback) {
    const response = await fetch("http://localhost:3000/notes");
    const data = await response.json();
    return callback(data);
  }

  async createNote(note, callback) {
    const data = { content: note };

    const response = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    return callback(responseData);
  }
}

module.exports = NotesClient;
