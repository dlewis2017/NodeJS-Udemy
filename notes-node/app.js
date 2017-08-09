//Require 3rd party modules
const fs = require('fs'); //<-- for modules
const _ = require('lodash'); //looks for lodash first in directory then goes to directory created upon installation
const yargs = require('yargs');

//Required modules I've created
const notes = require('./notes.js'); //<-- user path for local file

const titleOptions = {
	describe: 'Title of note',
	demand: true,
	alias: 't'
};


//Get and display all command line arguments
const argv = yargs
	.command('add', 'Add a new note', {
		title: titleOptions,
		body: {
			describe: "The body of the note",
			demand: true,
			alias: 'b'
		}
	})
	.command('list', 'List all notes')
	.command('read', 'Read a note',{
		title:titleOptions
	})
	.command('remove', 'Remove a existing note',{
		title:titleOptions
	})	
	.help()
	.argv;
var command = argv._[0];

//Handle commands
if (command === 'add'){
	var note = notes.addNote(argv.title,argv.body);
	if (note){
		console.log('Note created');
		notes.logNote(note);
	} else {
		console.log('Note could not be created');
	}

} else if (command === 'list'){
	var allNotes = notes.getAll();
	console.log(`Printing ${allNotes.length} note(s)`);
	allNotes.forEach((note) => notes.logNote(note));

} else if (command === 'remove'){
	var noteRemoved = notes.removeNote(argv.title);
	var message = noteRemoved ? 'Note was removed' : 'Note not found';
	console.log(message);

} else if (command === 'read'){
	var note = notes.getNote(argv.title);
	if (note){
		console.log('Reading note');
		notes.logNote(note);
	} else {
		console.log('Not not found');
	}

} else {
	console.log('Command not recognized');
}
