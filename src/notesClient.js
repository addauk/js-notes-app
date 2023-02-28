class NotesClient {
  async loadNotes(callback, errorCallback) {
    const response = await fetch("http://localhost:3000/notes").catch((error) =>
      errorCallback(error)
    );
    const data = await response.json();
    return callback(data);
  }

  async createNote(note, callback, errorCallback) {
    const data = { content: note };

    const response = await fetch("http://localhost:3000/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((error) => {
      errorCallback(error);
    });
    const responseData = await response.json();
    return callback(responseData);
  }
}

module.exports = NotesClient;
