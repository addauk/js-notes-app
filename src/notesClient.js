class NotesClient {
  loadNotes(callback, errorCallback) {
    fetch("http://localhost:3000/notes")
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => errorCallback(error));
  }

  async createNote(note, callback, errorCallback) {
    const data = { content: note };

    try {
      const response = await fetch("http://localhost:3000/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await response.json();
      return callback(responseData);
    } catch (error) {
      errorCallback(error);
    }
  }
}

module.exports = NotesClient;
