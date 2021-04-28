const assert = require('assert');
let User = require('../src/repository/User.js');
let TokenCRF = require('../src/middleware-CRF/crf-token.js');
const { request, response } = require('express');
let mailExiste = 'toto.toto@hotmail.fr';
let mailNotExiste = 'toto1.toto@hotmail.fr';
// let server = require('../server.js');


// .skip juste apres it va permettrer de zapper le test un peu comme un commentaire, si le test n'est pas totalement fini

describe('TestMailExiste', function() {
  it('should test if mail existe', (done) => {
    (new User).get_user_by_email(mailExiste).then(value => {
      // console.log(value);
      assert.notStrictEqual(value, null);
      done();
    })
  });
  it('should test not existe', (done) => {
    (new User).get_user_by_email(mailNotExiste).then(value => {
      // console.log(value);
      assert.strictEqual(value, null);
      done();
    })
  });
});

describe('Test du token', function() {
  it('should test if token existe', (done) => {
      let toto = TokenCRF.generate(request, response)
      console.log('response : ', toto);
      done();
    })
  // it('should test not existe', (done) => {
  //   (new User).get_user_by_email(mailNotExiste).then(value => {
  //     // console.log(value);
  //     assert.strictEqual(value, null);
  //     done();
  //   })
  // });
});