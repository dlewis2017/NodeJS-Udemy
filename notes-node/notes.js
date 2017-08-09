const fs = require('fs');
//module.exports.addNote = () => {  //arrow function does not bind key word or arguments array (could result in errors)
//	console.log('addNote');
//	return 'New Note';
//}

//fetch existing notes so new note doesnt write over existing
var fetchNotes = () => {
	try{
		var notesString = fs.readFileSync('notes-data.json');
		return JSON.parse(notesString);
	} catch(e) {
		console.log(e);
		return [];
	}
};

//write note to file in string form
var saveNotes = (notes) => {
	fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

//create note and add to notes array
var addNote = (title,body) => {
	var notes = fetchNotes();
	var note = {
		title,
		body
	};
	//filter loops through notes and checks for; arrow function allows for one line
	var duplicateNotes = notes.filter((note) => note.title === title);

	if(duplicateNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}

};

var getAll = () => {
	return fetchNotes();
};

var getNote = (title) => {
	var notes = fetchNotes();
	var specificNote = notes.filter((note) => note.title === title);

	return specificNote[0];
};

//loop through notes, removing note if titles are equal
var removeNote = (title) => {
	var notes = fetchNotes();
	var filteredNotes = notes.filter((note) => note.title !== title);
	saveNotes(filteredNotes);

	return notes.length !== filteredNotes.length;

};

//read note title and body
var logNote = (note) => {
	console.log('---');
	console.log(`Title: ${note.title}`);
	console.log(`Body: ${note.body}`);
};

module.exports = {
	addNote,
	getAll,
	getNote,
	removeNote,
	logNote
};
