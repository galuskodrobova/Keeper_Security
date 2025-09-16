export const registerUserData = {
    firstName: 'Test',
    lastName: 'User',
    street: '123 Test St',
    city: 'Charlotte',
    state: 'NC',
    zip: '28277',
    phone: '1234567890',
    ssn: '123-45-6789',
  };
  
  export const invalidUserData = {
    ...registerUserData,
    lastName: '', 
  };


  export const credentials = {
    validPassword: 'Password123',
    invalidPassword: 'WrongPass',
  };
  
  export const mismatchedPasswordUserData = {
    ...registerUserData,
    username: 'user_' + Date.now(),
    password: 'Password123',
    confirmPassword: 'WrongPass',
  };
  