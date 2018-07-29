const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
const jwt = require('jsonwebtoken')
chai.use(chaiHttp)
var mongoose = require('mongoose');
var id = ""


describe('post article', function(){
  
    let token=""
  
    before(function(done) {
        // console.log("masuk disini bang")
        chai.request('http://localhost:3000')
        .post('/login')
        .send({
            '_method': 'post',
            'email': 'bram@mail.com',
            'password': '123456'
        })
        .end(function(err,res){
            token = res.body.token
            // console.log("====",res.body.token)
            expect(res).to.have.status(200)
            expect(res.body.user).to.have.property('email')
            expect(res.body.user).to.have.property('password')
            console.log("xxxxxxxxxxxx",token);
            done()
        }) 
    })

    it('post article test expect success',function(done) {
     
        console.log(token,"ini token")
        // let decoded = jwt.verify(token,"123456")
           
        chai.request('localhost:3000')
        .post('/home')
        .type('form')
        .set('token',token)
        .send({
            '_method': 'post',
            'userId': '5b3ae727ea1224027f750675',
            'title': 'makan bang',
            'image' :'https://storage.googleapis.com/live-code-gan/1532519226290img_3206.jpg',
            'content':'berhasil' 
        })
        .end(function(err,res) {
            // console.log(res.body)
            expect(res).to.have.status(200);
            expect(res.body.Article).to.have.property('userId')
            expect(res.body.Article).to.have.property('title')
            expect(res.body.Article).to.have.property('image')
            expect(res.body.Article).to.have.property('content')
            id = res.body.Article._id
            console.log(id)
            done();
        })
    })
})

describe('get article',function() {
    it("get article test",function(done) {
        chai.request('http://localhost:3000')
        .get('/home/articles')
        .end(function(err,res){
            expect(res).to.have.status(200);
            done()
        })
    })
})



describe('delete article',function() {
    this.timeout(7000);
    let token=""
    console.log("masuk sebelum test delete")
    before(function(done) {
        console.log("masuk before delete")
        chai.request('http://localhost:3000')
        .post('/login')
        .type('form')
        .send({
            '_method': 'post',
            'email': 'bram@mail.com',
            'password': '123456'
        })
        .end(function(err,res){
            token = res.body.token
            console.log("xxxxxxxxxxxxxxx",res.body.token)
            expect(res).to.have.status(200)
            expect(res.body.user).to.have.property('email')
            expect(res.body.user).to.have.property('password')
            console.log(" delete token",token);
            done()
        })
            
    })

    it("delete article test",function(done) {
        console.log("masuk delete")
        console.log(id)
        console.log("token delete==",token);
        
        chai.request('http://localhost:3000')
        .delete(`/home/articles/${id}`)
        .set('token', token)
        .end(function(err,res){
            console.log(err)
            expect(res).to.have.status(200);
            done()
        })
    })
})