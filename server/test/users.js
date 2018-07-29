const chai = require('chai')
const chaiHttp = require('chai-http')
const expect = chai.expect
chai.use(chaiHttp)

describe('signup test', function(){
    it('signup user expect true',function(done){
        chai.request('localhost:3000')
        .post('/')
        .type('form')
        .send({
            '_method': 'post',
            'username': 'brama1989',
            'email': 'bram@mail.com',
            'password': '123456'
        })
        .end(function(err,res){
            // console.log("====",res.body)
            expect(res).to.have.status(200)
            expect(res.body.users).to.have.property('username')
            expect(res.body.users).to.have.property('email')
            expect(res.body.users).to.have.property('password')
            done()
        })
    })
})

describe('signin test', function(){
    it('signin user expect true',function(done){
        chai.request('localhost:3000')
        .post('/login')
        .type('form')
        .send({
            '_method': 'post',
            'email': 'bram@mail.com',
            'password': '123456'
        })
        .end(function(err,res){
            console.log("====",res.body.token)
            expect(res).to.have.status(200)
            expect(res.body.user).to.have.property('email')
            expect(res.body.user).to.have.property('password')
            done()
        })
    })
})