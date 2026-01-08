const jwt = require('jsonwebtoken');

// Create a test token for development
function createTestToken() {
  const payload = {
    _id: 'test-admin',
    email: 'admin@siblore.com',
    role: 'admin'
  };
  
  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });
  console.log('Test JWT Token:');
  console.log(token);
  console.log('\nAdd this to your localStorage in the browser:');
  console.log(`localStorage.setItem('adminToken', '${token}');`);
  console.log('\nOr use it in Postman/Insomnia with Authorization header:');
  console.log(`Authorization: Bearer ${token}`);
}

require('dotenv').config();
createTestToken();
