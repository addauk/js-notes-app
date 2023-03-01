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

  reset(callback, errorCallback) {
    fetch("http://localhost:3000/notes", {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => callback(data))
      .catch((error) => errorCallback(error));
  }

  emojify(text, callback, errorCallback) {
    const data = { text: text };
    fetch("https://makers-emojify.herokuapp.com/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => callback(responseData.emojified_text))
      .catch((error) => errorCallback(error));
  }
}

module.exports = NotesClient;
