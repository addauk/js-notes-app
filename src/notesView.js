class NotesView {
  constructor(model, client) {
    this.client = client;
    this.model = model;
    this.mainContainer = document.querySelector("#main-container");
    this.buttonEl = document.querySelector("#add-button");
    this.inputEl = document.querySelector("#note-input");
    this.buttonEl.addEventListener("click", () => {
      this.addNote();
    });
  }

  async displayNotesFromApi() {
    this.client.loadNotes(
      (notesData) => {
        this.model.setNotes(notesData);
        this.displayNotes();
      },
      (error) => this.displayError(error)
    );
  }

  displayNotes() {
    const notes = this.model.getNotes();
    const pageNotes = document.querySelectorAll("div .note");
    pageNotes.forEach((note) => {
      note.remove();
    });
    notes.forEach((note) => {
      const div = document.createElement("div");
      div.className = "note";
      div.textContent = note;
      this.mainContainer.append(div);
    });
  }

  displayError(error) {
    const div = document.createElement("div");
    div.className = "error";
    div.textContent = "Oops, something went wrong!" + error;
    this.mainContainer.append(div);
  }

  addNote = async () => {
    this.client.createNote(
      this.inputEl.value,
      (data) => {
        this.model.setNotes(data);
        this.inputEl.value = null;
        this.displayNotes();
      },
      (error) => this.displayError(error)
    );
  };
}

module.exports = NotesView;
