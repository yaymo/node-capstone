const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const mongoose = require('mongoose');
const faker = require('faker');
const {User} = require('../app/models/user');


const {app, runServer, closeServer} = require('../server');
const {Show} = require('../app/models/show');
const {TEST_DATABASE_URL} = require('../config/database');
chai.use(chaiHttp);


function seedShowData() {
  const seedData = [];

  for(let i=0; i<=10; i++) {
    seedData.push(generateShowData());
  }

  return Show.insertMany(seedData);
}

function generateShowData() {
  return {
    title: faker.lorem.word()
  }
}

function generateUserLogin() {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    id: faker.random.uuid()
  }
}

function seedUserLogin() {
  const seedData = [];

  for(let i=0; i<=10; i++) {
    seedData.push(generateUserLogin());
  }
  return User.insertMany(seedData);
}

function tearDownDb() {
  return mongoose.connection.dropDatabase();
}



describe('initial get root request', () => {
    it('should render login page', () => {
      return chai.request(app)
        .get('/')
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.html;
        });
    });
});

describe('user endpoint tests', () => {
  before(() => {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(() => {
    return seedUserLogin();
  });

  afterEach(() => {
    return tearDownDb();
  });

  after(() => {
    return closeServer();
  });

  describe('get endpoint', () => {
    it('should return 200', () => {
      let res;
      return chai.request(app)
        .get('/')
        .then((_res) => {
          res = _res;
          res.should.have.status(200);
        })
    });
  });

  describe('post endpoint', () => {
    it('should add a new user', () => {
      const newUser = generateUserLogin();

      return chai.request(app)
        .post('/users')
        .send(newUser)
        .then((res) => {
          res.should.be.json;
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.include.keys('username', 'id');
          res.body.id.should.not.be.null;
        });
    });
  });


  describe('delete endpoint', () => {
    it('should remove user from db', () => {
      let user;

      const newUser = generateUserLogin();

      return chai.request(app)
        .post('/users')
        .send(newUser)
        .then((res) => {
          res.should.have.status(201);
          console.log(res._id);

        })

          return User
            .findOne()
            .exec()
            .then((user) => {
              return chai.request(app).delete(`/users/${user.id}`);
            })

            .then((res) => {
              res.should.have.status(204)

              return User.findById(user.id);
            })

            .then(_user => {
              should.not.exist(_user);
            });
    });
  });
});

