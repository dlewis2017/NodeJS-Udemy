const expect = require('expect');
const utils = require('./utils');

//separate tests
describe('Utils', () => {

	describe('#add', () => {
		it('should add two numbers', () => {
			var result = utils.add(33,11);
		  // if (result !== 44) {
		  //     throw new Error (`Expected 44 but got ${result}`);
		  // }
		  //same as commented out code expcept using expect
		  expect(result).toBe(44).toBeA('number');
		});
	});

	//async function to test
	it('should async add two numbers', (done) => {
	  utils.asyncAdd(4,3, (sum) => {
	    expect(sum).toBe(7).toBeA('number');
	    done();
	  });
	});

	it('should square a number', () => {
	  var result = utils.square(4);
	  // if(result !== 16) {
	  //   throw new Error (` Expected 16 but got ${result}`);
	  // }
	  expect(result).toBe(16).toBeA('number');
	});

	it('should async square a number', (done) => {
	  utils.asyncSquare(4, (product) => {
	    expect(product).toBe(16).toBeA('number');
	    done();
	  });
	})
});

// it('should expect some values', () => {
//   expect(12).toNotBe(12);
//   //use toEqual for objects and arrays
//   expect({name: 'David'}).toEqual({name: 'David'});
//   expect([2,3,4]).toExclude(5);
//   expect({
//     name: 'David',
//     age: 22,
//     location: '22204'
//   }).toExclude({
//     age: 25
//   })
// });

it('Should verify first and last name are set', () => {
  var user = {
    age: 22,
    location: 'Washington DC'
  }
  var result = utils.setName(user, 'David Lewis');
  expect(result).toInclude({
    firstName: 'David',
    lastName: 'Lewis'
  });

});
