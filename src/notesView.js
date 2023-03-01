class NotesView {
  constructor(model, client) {
    this.client = client;
    this.model = model;
    this.mainContainer = document.querySelector("#main-container");
    this.addButtonEl = document.querySelector("#add-button");
    this.resetButtonEl = document.querySelector("#reset-button");
    this.inputEl = document.querySelector("#note-input");
    this.addButtonEl.addEventListener("click", () => {
      this.addNote();
    });
    this.resetButtonEl.addEventListener("click", () => {
      this.resetAllNotesFromApi();
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

  async resetAllNotesFromApi() {
    this.client.reset(
      (data) => {
        this.model.setNotes(data);
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
