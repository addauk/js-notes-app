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
    this.client.loadNotes((notesData) => {
      this.model.setNotes(notesData);
      this.displayNotes();
    });
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

  addNote() {
    this.model.addNote(this.inputEl.value);
    this.displayNotes();
    this.inputEl.value = null;
  }
}

module.exports = NotesView;
