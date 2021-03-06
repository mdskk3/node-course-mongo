const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');
const {User} = require('./../models/user');
const {todos, populateTodos, users, populateUsers} = require('./seed/seed');

//runs before every test case -- clearing all data in DB
beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';
    request(app)
    .post('/todos')
    .set('x-auth',users[0].tokens[0].token)
    .send({text})
    .expect(200)
    .expect((res) => {
      expect(res.body.text).toBe(text);
    })
    .end((err, res) => {
      if (err) {
        return done(err);
      }

      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e) => done(e));
    });
  });

  it('should not create todo with invalid data', (done) => {
    var text ='';
    request(app)
    .post('/todos')
    .set('x-auth',users[0].tokens[0].token)
    .send({text}) //.send({}) can also be used
    .expect(400)
    .end((err, res) => {
      if(err){
        return done(err);
      }

      Todo.find().then((todos) => {
        expect(todos.length).toBe(2);
        done();
      }).catch((e) => done(e));
    });
  });
});

describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
    .get('/todos')
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.todos.length).toBe(1); //2 if auth is not enabled, 1 if auth is enabled
    })
    .end(done);
  });
});

describe('GET /todos/:id', () => {
  it('should get todo doc', (done) => {
    request(app)
    .get(`/todos/${todos[0]._id.toHexString()}`)
    .set('x-auth',users[0].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(todos[0].text);
    })
    .end(done);
  });
  it('should not get todo doc created by other user', (done) => {
    request(app)
    .get(`/todos/${todos[1]._id.toHexString()}`)
    .set('x-auth',users[0].tokens[0].token)
    .expect(404)
    .end(done);
  });
  it('should return 404 if todo not found', (done) => {
    var id = new ObjectID();//ObjectID().toHexString();
    request(app)
    .get(`/todos/${id.toHexString()}`)//${id}
    .set('x-auth',users[0].tokens[0].token)
    .expect(404)
    .end(done);
  })
  it('should return 404 for non-object ids', (done) => {
    var id = '123tyu';
    request(app)
    .get(`/todos/${id}`)
    .set('x-auth',users[0].tokens[0].token)
    .expect(404)
    .end(done);
  })
});

describe('DELETE /todos/:id', () => {
  it('should remove a todo', (done) => {
    var id = todos[1]._id.toHexString();

    request(app)
    .delete(`/todos/${id}`)
    .set('x-auth',users[1].tokens[0].token)
    .expect(200)
    .expect((res) => {
      expect(res.body.todo._id).toBe(id);
    })
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.findById(id).then((todos) => {
        //expect(todos).toNotExist(); -- Older Expect version
        expect(todos).toBeFalsy(); //toBeFalsy is alternative to toNotExist
        done();
      }).catch((e) => done(e));
    });
  });
  it('should not remove a todo of other user', (done) => {
    var id = todos[0]._id.toHexString();

    request(app)
    .delete(`/todos/${id}`)
    .set('x-auth',users[1].tokens[0].token)
    .expect(404)
    .end((err, res) => {
      if(err) {
        return done(err);
      }
      Todo.findById(id).then((todos) => {
        //expect(todos).toExist(); -- Older Expect version
        expect(todos).toBeTruthy(); //toBeTruthy is alternative to toExist
        done();
      }).catch((e) => done(e));
    });
  });
  it('should return 404 if todo not found', (done) => {
    var id = new ObjectID().toHexString();
    request(app)
    .delete(`/todos/${id}`)//${id}
    .set('x-auth',users[1].tokens[0].token)
    .expect(404)
    .end(done);
  });
  it('should return 404 if object id is invalid', (done) => {
    var id = '123tyu';
    request(app)
    .delete(`/todos/${id}`)
    .set('x-auth',users[1].tokens[0].token)
    .expect(404)
    .end(done);
  });
});
describe('PATCH /todos/id', () => {
  it('should update the todo',(done) => {
    var id = todos[0]._id.toHexString();
    var text = "Updated Case 1";
    request(app)
    .patch(`/todos/${id}`)
    .set('x-auth',users[0].tokens[0].token)
    .send({
      "completed": true,
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(true);
      // expect(res.body.todo.completedAt).toBeA('number'); --Older expect version
      expect(typeof res.body.todo.completedAt).toBe('number'); //New version doesnt support toBeA, hence we use typeof and toBe
    })
    .end(done);
  });
  it('should not update the todo of other user',(done) => {
    var id = todos[0]._id.toHexString();
    var text = "Updated Case 1";
    request(app)
    .patch(`/todos/${id}`)
    .set('x-auth',users[1].tokens[0].token)
    .send({
      "completed": true,
      text
    })
    .expect(404)
    .end(done);
  });
  it('should clear completedAt when todo is not completed', (done) => {
    var id = todos[1]._id.toHexString();
    var text = "Updated Case 2";

    request(app)
    .patch(`/todos/${id}`)
    .set('x-auth',users[1].tokens[0].token)
    .send({
      "completed": false,
      text
    })
    .expect(200)
    .expect((res) => {
      expect(res.body.todo.text).toBe(text);
      expect(res.body.todo.completed).toBe(false);
      expect(res.body.todo.completedAt).toBeFalsy();//toBeNull()
    })
    .end(done);
  });

});


describe('GET /users/me', () => {
  it('should return user if authenticated', (done) => {
    request(app)
      .get('/users/me')
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .expect((res) => {
        expect(res.body._id).toBe(users[0]._id.toString());
        expect(res.body.email).toBe(users[0].email);
      })
      .end(done);
  });

  it('should return 401 if not authenticated', (done) => {
    request(app)
      .get('/users/me')
      .expect(401)
      .expect((res) => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});


describe('POST /users', () => {

  it('should create a user', (done) => {
    var email='test3@example.com';
    var password='abc1234!';

    request(app)
      .post('/users')
      .send({email, password})
      .expect(200)
      .expect((res) => {
        expect(res.headers['x-auth']).toBeTruthy();
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end((err) => {
        if(err) {
          return done(err);
        }
        User.findOne({email}).then((user) => {
          expect(user).toBeTruthy();
        //  expect(user.password).toNotBe(password); --Older Expect version
        expect(user.password).not.toBe(password); // we use not and toBe combination to reverse an assertion
          done();
        }).catch((e) => done (e));
      });
  });

  it('should return validation error if request invalid', (done) => {
    request(app)
      .post('/users')
      .send({
        email: 'dar',
        password: '123'
      })
      .expect(400)
      .end(done);
  });

  it('should not create user if email in use', (done) => {
    request(app)
    .post('/users')
    .send({
      email: users[0].email,
      password: 'Passw123!'
    })
    .expect(400)
    .end(done);
  });
});


describe('POST /users/login', () => {

  it('should login user and return auth token', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: users[1].email,
      password: users[1].password
    })
    .expect(200)
    .expect((res) => {
      expect(res.headers['x-auth']).toBeTruthy();
    })
    .end((err,res) => {
      if(err) {
        return done(err);
      }

      User.findById(users[1]._id).then((user) => {
      //  expect(user.tokens[1]).toInclude -- Older expect version
          expect(user.toObject().tokens[1]).toMatchObject({
          access: 'auth',
          token: res.headers['x-auth']
        });
        done();
      }).catch((e) => done (e));
    });
  });

  it('should reject invalid login', (done) => {
    request(app)
    .post('/users/login')
    .send({
      email: users[1].email,
      password: users[1].password + '2'
    })
    .expect(400)
    .expect((res) => {
      expect(res.headers['x-auth']).toBeFalsy();
    })
    .end((err,res) => {
      if(err) {
        return done(err);
      }

      User.findById(users[1]._id).then((user) => {
        expect(user.tokens.length).toBe(1);
        done();
      }).catch((e) => done (e));
    });
  });
});

describe('DELETE /users/me/token', () => {
  it('should remove auth token on logout', (done) => {
    request(app)
      .delete('/users/me/token')
      .set('x-auth',users[0].tokens[0].token)
      .expect(200)
      .end((err,res) => {
        if(err) {
          return done(err);
        }

        User.findById(users[0]._id).then((user) => {
          expect(user.tokens.length).toBe(0);
          done();
        }).catch((e) => done(e));
      })
  });
});
