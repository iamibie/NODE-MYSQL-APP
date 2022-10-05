import supertest from "supertest";
import '../index.js'



const request = supertest


describe('GET /', function(){
 it('respond with hello world', function(done) {
  
  request('../index.js').get('/');
  done()
 });
});