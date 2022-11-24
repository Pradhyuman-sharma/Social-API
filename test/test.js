
let mongoose = require("mongoose");
let User = require('../models/user');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
const {describe,it,before}=  require('mocha')
const expect = chai.expect

chai.use(chaiHttp);
chai.should();

describe("Tests",()=>{
//  before((done)=>{
//     console.log("i am in before hook");
//     (async () => {
//         try {
//           await mongoose.connect(process.env.MONGO_URL,()=>{
//             console.log("database connected");
//           })
//         } catch (err) {
//           console.log('error: ' + err)
//         }
//       })();
//       done();
//  })
 

  describe('GET / ', () => {
    it('it should GET the root route',  (done) => {
        chai.request(server)
          .get('/')
          .end((err, res) => {
                expect(res).to.have.status(200);
            done();
          });
    });
}).timeout(10000);

describe('GET users ', () => {
    it('it should GET all user',   (done) => {
        chai.request(server)
          .get('/api/users')
          .end((err, res) => {
                res.should.have.status(200);
            done();
          });
    });
}).timeout(10000);

describe('GET /api/posts/:id ', () => {
    it('it should GET the post with id but we are passing wrong id so it should fail with 500',   (done) => {
        chai.request(server)
          .get('/api/posts/637ddcbc19a5673581227177ads')
          .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
            done();
          });
    });
}).timeout(10000);

  describe('GET /api/users/:id', () => {
    
      it('it should get the user with the respective id ', (done) => {
       chai.request(server)
            .get('/api/users/637ccf488b29f30ca8bd128d')
            .end((err, res) => {
                
                  res.should.have.status(200);
                  res.body.should.be.a('object');
              done();
            });
      });

  })
}).timeout(10000);