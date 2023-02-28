const NotesModel = require("./notesModel");

describe("NotesModel", () => {
  it("returns an empty list", () => {
    const model = new NotesModel();
    expect(model.getNotes()).toEqual([]);
  });

  it("adds some notes and returns them", () => {
    const model = new NotesModel();
    model.addNote("Buy Milk");
    model.addNote("Go to the gym");
    expect(model.getNotes()).toEqual(["Buy Milk", "Go to the gym"]);
  });

  it("resets the notes to an empty list", () => {
    const model = new NotesModel();
    model.addNote("Buy Milk");
    model.addNote("Go to the gym");
    model.reset();
    expect(model.getNotes()).toEqual([]);
  });
});
