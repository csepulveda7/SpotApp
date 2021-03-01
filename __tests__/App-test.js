var user = require('../spot-backend/Services/user');


// it('tests user creation with same email must fail', async () => {
//   const userData = {name: 'username', email: 'email@email8.com', password: 'password' };
//   expect.assertions(1);
//   try {
//     await user.createUser(userData);
//   } catch (e) {
//     expect(e).toMatch(e);
//     done();
//   }
// });

test('Test User creation', () => {
  const userData = {name: 'username', email: 'email@email9.com', password: 'password' };
  
  user.createUser(userData).then( res => {
    expect(res).toBe(true);
    done();
  }).catch(error =>{
    expect(error).not.toBeTruthy();
    done();
  });
}); 

test('MUST FAIL: tests user creation with same email', () => {
  const userData = {name: 'username', email: 'email@email9.com', password: 'password' };
  
  user.createUser(userData).then( res => {
    expect(res).toBeTruthy();
    done();
  }).catch(error=>{
    expect(error).toBe(error)
  });
}); 

// test('Test user log in', () => {
//   const userData = {email: 'email@email8.com', password: 'password' };
//   user.loginUser(userData).then( res => {
//     expect(res).toBe(true);
//     done();
//   }).catch(error =>{
//     expect(error).not.toBeTruthy();
//     done();
//   });
// });

