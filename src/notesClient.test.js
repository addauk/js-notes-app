const NotesClient = require("./notesClient");

// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require("jest-fetch-mock").enableMocks();

describe("NotesClient class", () => {
  it("calls fetch and loads data", (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();

    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(
      JSON.stringify(["This note is coming from the server"])
    );

    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi[0]).toBe(
        "This note is coming from the server"
      );
      done();
    });
  });

  it("calls fetch and POSTs the data", (done) => {
    const client = new NotesClient();
    fetch.mockResponseOnce(JSON.stringify(["blah blah"]));

    client.createNote("blah blah", (returnedDataFromApi) => {
      expect(returnedDataFromApi[returnedDataFromApi.length - 1]).toBe(
        "blah blah"
      );
      done();
    });
  });

  it("calls fetch and deletes all the note data", (done) => {
    const client = new NotesClient();
    fetch.mockResponseOnce(JSON.stringify([]));
    client.reset((returnedDataFromApi) => {
      expect(returnedDataFromApi.length).toBe(0);
      done();
    });
  });

  it("converts emoji syntax to emojis", (done) => {
    const client = new NotesClient();
    fetch.mockResponse(JSON.stringify({ emojified_text: "hello 🌍" }));
    client.emojify(
      "hello :earth_africa:",
      (returnedDataFromApi) => {
        expect(returnedDataFromApi).toBe("hello 🌍");
        done();
      },
      (error) => console.log(error)
    );
  });
});
