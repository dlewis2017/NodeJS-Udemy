// var obj = {
//   name: 'David'
// };
// var stringObj = JSON.stringify(obj); //convert obj to json string
// console.log(typeof stringObj);
// console.log(stringObj);

// var personString = '{"name":"David","age":22}';
// var person = JSON.parse(personString); //convert string back into original form (object, array)
//
// console.log(typeof person);
// console.log(person);

const fs = require('fs');

//create note
var originalNote = {
  title: "Some title",
  body: "Some body"
};
//covert obj to json string and write to file notes.json
var originalNoteString = JSON.stringify(originalNote);
fs.writeFileSync('notes.json', originalNoteString);

//convert string read from notes.json to obj and print title
var noteString = fs.readFileSync('notes.json');
var note = JSON.parse(noteString);
console.log(typeof note);
console.log(note.title);
