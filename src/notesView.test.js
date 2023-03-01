/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const NotesView = require("./notesView");
const NotesModel = require("./notesModel");
const NotesClient = require("./notesClient");

jest.mock("./notesClient");

describe("NotesView", () => {
  beforeEach(() => {
    NotesClient.mockClear();
    document.body.innerHTML = fs.readFileSync("./index.html");
  });

  it("constructs", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    const view = new NotesView(model, mockClient);
    expect(view).toBeInstanceOf(NotesView);
    expect(view.model).toEqual(model);
  });

  it("displayNotesFromApi()", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    mockClient.loadNotes.mockImplementation((callback) => callback(["Hello"]));
    const view = new NotesView(model, mockClient);
    view.displayNotesFromApi();
    const dom = document.querySelectorAll(".note");
    expect(dom.length).toBe(1);
    expect(dom[0].textContent).toBe("Hello");
  });

  it("displays an error", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    const view = new NotesView(model, mockClient);
    view.displayError();
    const dom = document.querySelectorAll(".error");
    expect(dom[0].textContent).toContain("Oops, something went wrong!");
  });

  it("displayNotes from internal store", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    const view = new NotesView(model, mockClient);
    model.addNote("Hello");
    model.addNote("World");
    view.displayNotes();
    expect(document.querySelectorAll(".note").length).toBe(2);
    expect(document.querySelectorAll(".note")[1].textContent).toBe("World");
  });

  it("adds a new note and displays from api", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    mockClient.createNote.mockImplementation((note, callback) =>
      callback([note])
    );
    const view = new NotesView(model, mockClient);
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Hello world";
    const addButton = document.querySelector("#add-button");
    addButton.click();
    expect(document.querySelector("div .note").textContent).toBe("Hello world");
  });

  it("resets all notes on api", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    mockClient.createNote.mockImplementation((note, callback) =>
      callback([note])
    );
    mockClient.reset.mockImplementation((callback) => callback([]));
    const view = new NotesView(model, mockClient);
    const inputEl = document.querySelector("#note-input");
    inputEl.value = "Hello world";
    const addButton = document.querySelector("#add-button");
    addButton.click();
    expect(document.querySelector("div .note").textContent).toBe("Hello world");
    const resetButton = document.querySelector("#reset-button");
    resetButton.click();
    expect(document.querySelector("div .note")).toEqual(null);
  });

  it("shows the correct number of notes after multiple adds", () => {
    const model = new NotesModel();
    const mockClient = new NotesClient();
    const view = new NotesView(model, mockClient);
    model.addNote("Hello");
    view.displayNotes();
    model.addNote("World");
    view.displayNotes();
    expect(document.querySelectorAll(".note").length).toBe(2);
  });
});
