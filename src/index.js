const NotesModel = require("./notesModel");
const NotesView = require("./notesView");
const NotesClient = require("./notesClient");
console.log("The notes app is running");
const model = new NotesModel();
const client = new NotesClient();
const view = new NotesView(model, client);

client.loadNotes(
  (notes) => {
    // This will be executed if notes are loaded correctly from the server
    model.setNotes(notes);
    view.displayNotes();
  },
  (error) => {
    // This will be executed if there's an error
    view.displayError(error);
  }
);
