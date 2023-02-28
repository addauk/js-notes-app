/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");

describe("NotesView", () => {
  beforeEach(() => {
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("constructs", () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    expect(view).toBeInstanceOf(NotesView);
    expect(view.model).toEqual(model);
  });

  it("displayNotes", () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote("Hello");
    model.addNote("World");
    view.displayNotes();
    expect(document.querySelectorAll(".note").length).toBe(2);
    expect(document.querySelectorAll(".note")[1].textContent).toBe("World");
  });

  it("adds a new note and displays", () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Hello world";
    const addButton = document.querySelector("#add-button");
    addButton.click();
    expect(document.querySelector("div .note").textContent).toBe("Hello world");
  });

  it("shows the correct number of notes after multiple adds", () => {
    const model = new NotesModel();
    const view = new NotesView(model);
    model.addNote("Hello");
    view.displayNotes();
    model.addNote("World");
    view.displayNotes();
    expect(document.querySelectorAll(".note").length).toBe(2);
  });
});
