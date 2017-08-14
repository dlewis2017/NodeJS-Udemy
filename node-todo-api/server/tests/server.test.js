const request = require('supertest');
const expect = require('expect');

const {app} = require('./../server')
const {Todo} = require('./../models/todo');

const todos = [{
  text: 'First test todo'
}, {
  text: 'Second test todo'
}];
//automatically run code before test case; in this case, make sure database is empty
beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

//test if a post worked correctly
describe('POST /todos', () => {
  //new todo created properly
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

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
        Todo.find({text}).then((todos) => {
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
        expect(todos.length).toBe(2);
        done();
      }).catch( (err) => done(err) );
    });
  });
});

//test if GET worked correctly
describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
  });
})
