const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server')
const {Todo} = require('./../models/todo');

//run code before test case; in this case, make sure database is empty
//automatically runs before each test case ('it')
beforeEach((done) => {
  Todo.remove({}).then(() => done());
});

//test if a post worked correctly
describe('POST /todos', () => {
  //new todo created properly
  it('should create a new todo', (done) => {
    var text = 'testing todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        //verify todo was added (fetch data)
        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch( (err) => done(err) );

      });
  });
  //check valid data
  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
      //verify length of todos is 0
      Todo.find().then((todos) => {
        expect(todos.length).toBe(0);
        done();
      }).catch( (err) => done(err) );
    });
  });
});
